from django.db import models
from django.utils.translation import gettext as _
import requests

class HousePrice(models.Model):
    #Should create enum for town, flat_type, flat_model

    id = models.IntegerField(_('id'), primary_key=True)
    month = models.CharField(_('month'), max_length=10, )
    town = models.CharField(_('town'), max_length=255)
    flat_type = models.CharField(_("flat_type"), max_length=50)
    block  = models.CharField(_("block"), max_length=8)
    street_name = models.CharField(_("street_name"), max_length=255)
    storey_range = models.CharField(_("storey_range"), max_length=8)
    floor_area_sqm = models.FloatField(_("floor_area_sqm"), blank=True)
    flat_model = models.CharField(_("flat_model"), max_length=255)
    lease_commence_date = models.FloatField(_("lease_commence_date"), blank=True)
    remaining_lease = models.CharField(_("remaining_lease"), max_length=255)
    resale_price = models.FloatField(_("resale_price"), blank=True)
    
    def __str__(self) -> str:
        return f"{self.id} {self.town} {self.flat_type} {self.block} {self.street_name} {self.storey_range} {self.floor_area_sqm} {self.flat_model} {self.lease_commence_date} {self.remaining_lease} {self.resale_price}"

def get_top5():
    url = "https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&limit=5"
    response = requests.get(url)
    data = response.json()["result"]
    records = data["records"]
    for record in records:
        if not HousePrice.objects.filter(id= record["_id"]).exists():
                HousePrice.objects.create(
                    id = record["_id"], month = record["month"],
                    town = record["town"],
                    flat_type = record["flat_type"],
                    block = record["block"],
                    street_name = record["street_name"],
                    storey_range = record["storey_range"],
                    floor_area_sqm = record["floor_area_sqm"],
                    flat_model = record["flat_model"],
                    lease_commence_date = record["lease_commence_date"],
                    remaining_lease = record["remaining_lease"],
                    resale_price = record["resale_price"],
                )
        else:
            print("data already exists")

def get_all():
    url = "https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3"
    
    while url:
        response = requests.get(url)
        data = response.json()["result"]
        records = data["records"]

        if len(records) ==0:
            break
        for record in records:
            if not HousePrice.objects.filter(id= record["_id"]).exists():
                HousePrice.objects.create(
                    id = record["_id"], month = record["month"],
                    town = record["town"],
                    flat_type = record["flat_type"],
                    block = record["block"],
                    street_name = record["street_name"],
                    storey_range = record["storey_range"],
                    floor_area_sqm = record["floor_area_sqm"],
                    flat_model = record["flat_model"],
                    lease_commence_date = record["lease_commence_date"],
                    remaining_lease = record["remaining_lease"],
                    resale_price = record["resale_price"],
                )
            else:
                print("data already exists")

        url = "https://data.gov.sg" + data["_links"]["next"]

    print("saved")

# Create your models here.