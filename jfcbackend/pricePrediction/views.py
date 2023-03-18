from django.shortcuts import render
from pricePrediction.models import HousePrice

import requests
# Create your views here.


def get_top5():
    url = "https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&limit=5"
    response = requests.get(url)
    data = response.json()["result"]
    # fields = data["fields"]
    # print(fields)
    records = data["records"]
    # print(records)
    for record in records:
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
        print("saved")
