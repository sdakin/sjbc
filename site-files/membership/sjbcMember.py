from django.contrib.auth.models import User
from django.db import models

################################################################################
# MODELS
################################################################################

class SjbcMember(User):
    TYPE_OF_CYCLIST_CHOICES = (
        ('daily', 'Daily Cyclist. I bike everywhere!'),
        ('commuter', 'Commuter. I ride to school/work most days.'),
        ('recreational', 'Recreational. I ride for fun or fitness and may commute on occasion.'),
        ('liesure', 'Leisure. I go for short rides and may stop at the market or for coffee.'),
        ('non-rider', 'I don\'t ride, but applaud those who do and think bikes will transform the world.'),
    )

    # basic information
    street_address     = models.TextField(blank=True)
    city               = models.TextField(blank=True)
    state              = models.TextField(blank=True)
    zip_code           = models.TextField(blank=True)
    phone_number       = models.TextField(blank=True)
    type_of_cyclist    = models.CharField(max_length=16,
                                          choices=TYPE_OF_CYCLIST_CHOICES,
                                          blank=True)
    gender             = models.CharField(max_length=16, blank=True, null=True)
    date_of_birth      = models.DateField(blank=True, null=True)
    race_ethnicity     = models.TextField(blank=True, null=True)
    waiver_signed      = models.BooleanField(default=False)
    notes              = models.TextField(blank=True, null=True)
    
    # many-to-one relationships
    #   - donations
    #   - volunteer events/hours

    # public function/method api

################################################################################
# END OF FILE
################################################################################
