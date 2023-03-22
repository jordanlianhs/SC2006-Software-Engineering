from django.shortcuts import render
from .models import HousePrice
from django.core.paginator import Paginator

import requests
# Create your views here.


# Price Prediction View According to Alphabetic Order
def all_house_price(request):
    house_list = HousePrice.objects.all()

    house_paginator = Paginator(house_list, 100)

    page_num = request.GET.get('page')

    page = house_paginator.get_page(page_num)

    context = {
        'count': house_paginator.count,
        'page': page
        }
    return render(request, 'all_house_price.html', context)
