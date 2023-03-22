from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class CustomUser(AbstractUser):

    STATUS = (
        ('regular', 'regular'),
        ('subscriber', 'subscriber'),
        ('moderator', 'moderator'),
    )

    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    status = models.CharField(max_length=100, choices=STATUS, default='REGULAR')

    def __str__(self):
        return self.username


# class Account(models.Model):
#     body  = models.TextField(null=True, blank=True)
#     # Take sthe timestamp when the object is updated
#     updated = models.DateTimeField(auto_now=True)
#     # Only takes the timestamp of when the object is created
#     created = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.body[0:50]
