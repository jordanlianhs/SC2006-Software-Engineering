from rest_framework.serializers import ModelSerializer
from .models import CustomUser


class AccountSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        # serialises all fields: body, updated, created
        # or use a list ['body', 'updated', 'created']
        fields = '__all__'