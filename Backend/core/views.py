from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Sum, F
from django.utils.timezone import now
from .models import Subscription
from .serializers import SubscriptionSerializer 
from datetime import timedelta

class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all().order_by('-created_at')
    serializer_class = SubscriptionSerializer

    def destroy(self, request, *args, **kwargs):
        subscription = self.get_object()
        subscription.is_active = False
        subscription.save()
        return Response({"detail": "Subscription cancelled."}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def stats(self, request):
        today = now().date()
        next_week = today + timedelta(days=7)

        monthly_cost = (
            Subscription.objects.filter(is_active=True, billing_cycle='Monthly')
            .aggregate(total=Sum('cost'))['total'] or 0
        )
        yearly_equivalent = (
            Subscription.objects.filter(is_active=True, billing_cycle='Yearly')
            .aggregate(total=Sum(F('cost') / 12))['total'] or 0
        )

        total_monthly = monthly_cost + yearly_equivalent
        projected_yearly = total_monthly * 12

        upcoming = Subscription.objects.filter(
            is_active=True, renewal_date__range=(today, next_week)
        ).values("id", "name", "renewal_date", "cost")

        savings = []
        subs = Subscription.objects.all()  # ← الحين نشمل Active + Inactive
        for sub in subs:
            if sub.billing_cycle == 'Monthly':
                monthly_total = float(sub.cost) * 12
                yearly_sub = Subscription.objects.filter(
                    name=sub.name, billing_cycle='Yearly'  # ← بدون فلتر is_active
                ).first()
                potential_saving = None
                if yearly_sub:
                    potential_saving = monthly_total - float(yearly_sub.cost)
                savings.append({
                    "id": sub.id,
                    "name": sub.name,
                    "monthly_total": monthly_total,
                    "potential_yearly_saving": potential_saving
                })
            elif sub.billing_cycle == 'Yearly':
                yearly_total = float(sub.cost)
                monthly_equivalent = yearly_total / 12
                savings.append({
                    "id": sub.id,
                    "name": sub.name,
                    "monthly_total": monthly_equivalent,
                    "potential_yearly_saving": None
                })

        return Response({
            "total_monthly_cost": float(total_monthly),
            "projected_yearly": float(projected_yearly),
            "upcoming_renewals": list(upcoming),
            "potential_savings": savings
        })
