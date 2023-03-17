from django.db import models
from django.utils.translation import gettext as _
import requests


#import urllib.request

#link = "https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&limit=5"
#test = requests.get(link).json()
#print(test)

class HousePrices(models.Model):
    #month = models.CharField(_('month'), max_length=255)
    town = models.CharField(_('town'), max_length=255)

# with urllib.request.urlopen(link) as url:
#     fileobj = urllib.urlopen(url)
#     print(fileobj.read())

# Create your models here.