from django.db import models
from dateutil.relativedelta import relativedelta

class Subscription(models.Model):
    BILLING_CHOICES = [
        ('Monthly', 'Monthly'),
        ('Yearly', 'Yearly'),
    ]

    name = models.CharField(max_length=100)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    billing_cycle = models.CharField(max_length=50, choices=BILLING_CHOICES)
    start_date = models.DateField()
    renewal_date = models.DateField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    category = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.start_date and not self.renewal_date:
            if self.billing_cycle == 'Monthly':
                self.renewal_date = self.start_date + relativedelta(months=1)
            elif self.billing_cycle == 'Yearly':
                self.renewal_date = self.start_date + relativedelta(years=1)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.billing_cycle})"