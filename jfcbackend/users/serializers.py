from rest_framework.serializers import ModelSerializer
from .models import User


class AccountSerializer(ModelSerializer):
    class Meta:
        model = User
        # serialises all fields: body, updated, created
        # or use a list ['body', 'updated', 'created']
        fields = '__all__'