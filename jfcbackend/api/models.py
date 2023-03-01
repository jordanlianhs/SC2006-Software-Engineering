from django.db import models

# Create your models here.

class Account(models.Model):
    body  = models.TextField(null=True, blank=True)
    # Take sthe timestamp when the object is updated
    updated = models.DateTimeField(auto_now=True)
    # Only takes the timestamp of when the object is created
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50]
