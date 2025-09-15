from rest_framework import serializers
from .models import Subscription
from datetime import date
from dateutil.relativedelta import relativedelta


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = "__all__"  

    def validate_cost(self, value):
        """Ensure cost is positive"""
        if value <= 0:
            raise serializers.ValidationError("Cost must be a positive value.")
        return value

    def validate_billing_cycle(self, value):
        """Ensure billing cycle is valid"""
        if value not in ["Monthly", "Yearly"]:
            raise serializers.ValidationError("Billing cycle must be 'monthly' or 'yearly'.")
        return value

    def validate(self, data):
        """
        Custom validation:
        - Ensure renewal_date is in the future
        - Auto-calculate renewal_date if missing or inconsistent
        """
        start_date = data.get("start_date")
        billing_cycle = data.get("billing_cycle")
        renewal_date = data.get("renewal_date")

        if start_date and billing_cycle:
            expected_date = None
            if billing_cycle == "monthly":
                expected_date = start_date + relativedelta(months=1)
            elif billing_cycle == "yearly":
                expected_date = start_date + relativedelta(years=1)

            if not renewal_date:
                data["renewal_date"] = expected_date
            else:
                if renewal_date < date.today():
                    raise serializers.ValidationError("Renewal date cannot be in the past.")

        return data
