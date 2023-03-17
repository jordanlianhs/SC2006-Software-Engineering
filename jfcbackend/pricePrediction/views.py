from django.shortcuts import render
from pricePrediction.models import HousePrices

import requests
# Create your views here.


def get_top5():
    url = "https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&limit=5"
    response = requests.get(url)
    data = response.json()["result"]
    fields = data["fields"]
    records = data["records"]
    print(fields)
    print(records)