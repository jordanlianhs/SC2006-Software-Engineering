from rest_framework import serializers
from .models import HousePrice

class HousePriceSerializer(serializers.ModelSerializer):

    class Meta:
        model = HousePrice 
        fields = ('id', 'month', 'town', 'flat_type', 'block', 'street_name', 'storey_range', 'floor_area_sqm', 'flat_model', 'lease_commence_date', 'remaining_lease', 'resale_price', 'resale_price_aft1year', 'resale_price_aft2year', 'resale_price_aft3year', 'resale_price_aft4year', 'resale_price_aft5year', 'favourites')