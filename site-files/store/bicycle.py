from django.db import models

################################################################################
# MODELS
################################################################################

class Bicycle(models.Model):
    # basic information
    sjbc_id            = models.TextField()
    manufacturer       = models.TextField()
    model              = models.TextField()
    serial_number      = models.TextField(blank=True)
    color              = models.TextField(blank=True)
    frame_size_inches  = models.DecimalField(max_digits=4, decimal_places=2, default=0.0)
    wheel_size_inches  = models.DecimalField(max_digits=4, decimal_places=2, default=0.0)
    location           = models.TextField(blank=True)
    ready_for_sale     = models.BooleanField(default=False)
    
    # descriptive status fields
    initial_assessment = models.TextField(blank=True)
    work_performed     = models.TextField(blank=True)
    work_to_do         = models.TextField(blank=True)
    parts_used         = models.TextField(blank=True)
    parts_needed       = models.TextField(blank=True)
    misc_notes         = models.TextField(blank=True)
    
    # details for advertisements
    # example: 'Perfect Christmas or birthday present for a family on a budget!'
    sales_tagline      = models.TextField(blank=True)
    
    # public function/method api

################################################################################
# END OF FILE
################################################################################
