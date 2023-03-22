from django.contrib import admin
from .models import HousePrice
# Register your models here.


class HousePriceAdmin(admin.ModelAdmin):
    list_display = ('id','town', 'flat_type', 'block', 'street_name', 'floor_area_sqm', 'flat_model', 'remaining_lease', 'resale_price')

admin.site.register(HousePrice, HousePriceAdmin)