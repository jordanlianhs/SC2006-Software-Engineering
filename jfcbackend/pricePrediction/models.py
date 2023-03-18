from django.db import models
from django.utils.translation import gettext as _
import requests


#import urllib.request

#link = "https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&limit=5"
#test = requests.get(link).json()
#print(test)

class HousePrice(models.Model):
    #Should create enum for town, flat_type, flat_model, storey_range

    id = models.IntegerField(_('id'), primary_key=True)
    month = models.CharField(_('month'), max_length=10, )
    town = models.CharField(_('town'), max_length=255)
    flat_type = models.CharField(_("flat_type"), max_length=50)
    block  = models.IntegerField(_("block"), blank=True)
    street_name = models.CharField(_("street_name"), max_length=255)
    storey_range = models.CharField(_("storey_range"), max_length=8)
    floor_area_sqm = models.IntegerField(_("floor_area_sqm"))
    flat_model = models.CharField(_("flat_model"), max_length=255)
    lease_commence_date = models.IntegerField(_("lease_commence_date"), blank=True)
    remaining_lease = models.CharField(_("remaining_lease"), max_length=255)
    resale_price = models.IntegerField(_("resale_price"), blank=True)
    
    def __str__(self) -> str:
        return f"{self.id} {self.month} {self.town} {self.flat_type} {self.block} {self.street_name} {self.storey_range} {self.floor_area_sqm} {self.flat_model} {self.lease_commence_date} {self.remaining_lease} {self.resale_price}"
    
# with urllib.request.urlopen(link) as url:
#     fileobj = urllib.urlopen(url)
#     print(fileobj.read())

# Create your models here.