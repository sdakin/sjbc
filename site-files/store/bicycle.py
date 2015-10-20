from django.db import models

################################################################################
# MODELS
################################################################################

class Bicycle(models.Model):
    # basic information
    sjbc_id            = models.TextField()
    manufacturer       = models.TextField()
    model              = models.TextField()
    serial_number      = models.TextField()
    color              = models.TextField()
    frame_size_inches  = models.DecimalField(max_digits=4, decimal_places=2)
    wheel_size_inches  = models.DecimalField(max_digits=2, decimal_places=2)
    location           = models.TextField()
    ready_for_sale     = models.BooleanField(default=False)
    # descriptive status fields
    initial_assessment = models.TextField()
    work_performed     = models.TextField()
    work_to_do         = models.TextField()
    parts_used         = models.TextField()
    parts_needed       = models.TextField()
    misc_notes         = models.TextField()
    # details for advertisements
    sales_tagline      = models.TextField() # example: 'Perfect Christmas or birthday present for a family on a budget!'
    # public function/method api

################################################################################
# END OF FILE
################################################################################
