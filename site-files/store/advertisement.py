from django.db import models
from store.bicycle import Bicycle

################################################################################
# MODELS
################################################################################

class Advertisement(models.Model):
    # link to bicycle being sold
    bicycle         = models.ForeignKey(Bicycle)
    # basic details
    for_sale        = models.BooleanField(default=True)
    price_usd       = models.DecimalField(max_digits=6, decimal_places=2) # in dollars
    primary_image   = models.TextField() # url or local filepath
    secondary_image = models.TextField() # url or local filepath
    # craigslist ad details
    url_view_ad     = models.TextField() # url to view the ad
    url_edit_ad     = models.TextField() # url to edit / manage the ad
    # public function/method api
    def title_text(self):
        bike = self.bicycle
        output = bike.color + ' ' + bike.manufacturer + ' ' + bike.model
        return output
    @property
    def price(self):
        return '$%s' % self.price_usd
    def body_text(self):
        bike = self.bicycle
        key_details = [
            ' '.join([bike.color, bike.manufacturer, bike.model]),
            bike.frame_size_inches + '-inch frame',
            bike.wheel_size_inches + '-inch wheels',
            'in very good condition'
            ]
        bike_desc = ', '.join(key_details)
        if bike.sales_tagline:
            bike_desc += ' ' + bike.sales_tagline
        about_sjbc = 'This bike just had a tune up and complete safety inspection by members of San Jose Bike Clinic, a fiscally sponsored program of Silicon Valley Bicycle Coalition*. All proceeds go to support our do-it-yourself community bicycle workshop at our new permanent space in downtown San Jose! You can find us at 19 N. 2nd St, and online at www.sjbikeclinic.org.'
        about_sale = 'Come in during our shop hours Monday through Thursday from 5 pm to 8 pm, or by appointment. Cash or credit okay, you must pick up, no trades. Must include your name and phone number for a prompt and courteous response.'
        thanks = 'Thank you! And ride on. . .'
        about_svbc = '*Silicon Valley Bicycle Coalition is a 501(c)-3 non-profit. Find out more at www.bikesiliconvalley.org.'
        body_text = '\n\n'.join([bike_desc, about_sjbc, about_sale, thanks, about_svbc])
        return body_text

################################################################################
# END OF FILE
################################################################################
