from rest_framework import serializers
from .models import HousePrice

class HousePriceSerializer(serializers.ModelSerializer):

    class Meta:
        model = HousePrice 
        fields = '__all__'