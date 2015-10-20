from django.db import models

class Bike(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    thumbnail = models.CharField(max_length=50)
    image = models.CharField(max_length=50)
