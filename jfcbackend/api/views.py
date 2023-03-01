from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Account
from .serializers import AccountSerializer

# Create your views here.

# Can add in GET, POST, PUT, DELETE
@api_view(['GET'])

def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    
    return Response(routes)


# Can add in GET, POST, PUT, DELETE
@api_view(['GET'])
def getAccounts(request):
    accounts = Account.objects.all()

    #Pass the data to the serializer
    serializer = AccountSerializer(accounts, many=True)

    return Response(serializer.data)


# Can add in GET, POST, PUT, DELETE
@api_view(['GET'])
def getAccount(request, primary_key):
    accounts = Account.objects.get(id=primary_key)

    #Pass the data to the serializer
    serializer = AccountSerializer(accounts, many=False)

    return Response(serializer.data)