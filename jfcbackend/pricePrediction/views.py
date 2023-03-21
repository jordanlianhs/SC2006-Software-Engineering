from django.shortcuts import render
from .models import HousePrice

import requests
# Create your views here.


# Price Prediction View According to Alphabetic Order
def all_house_price(request):
    house_list = HousePrice.objects.all()
    return render(request, 'all_house_price.html', {'house_list': house_list})
