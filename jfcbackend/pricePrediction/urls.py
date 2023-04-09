from django.urls import path,include
from . import views

from django.conf import settings
from django.conf.urls.static import static

app_name = 'houses'

urlpatterns = [  
    path('all_house_price/', views.all_house_price, name='all_house_price'),
    path('all_house_price_2/', views.all_house_price_2, name='all_house_price_2'),
    path('house_price/<house_id>/', views.house_price, name='house_price'),
]
