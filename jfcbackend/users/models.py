# from django.db import models
# from django.contrib.auth.models import AbstractUser

# # Create your models here.

# class CustomUser(AbstractUser):

#     STATUS = (
#         ('regular', 'regular'),
#         ('subscriber', 'subscriber'),
#         ('moderator', 'moderator'),
#     )

#     username = models.CharField(max_length=100, unique=True)
#     email = models.EmailField(unique=True)
#     status = models.CharField(max_length=100, choices=STATUS, default='REGULAR')

#     def __str__(self):
#         return self.username


# # class Account(models.Model):
# #     body  = models.TextField(null=True, blank=True)
# #     # Take sthe timestamp when the object is updated
# #     updated = models.DateTimeField(auto_now=True)
# #     # Only takes the timestamp of when the object is created
# #     created = models.DateTimeField(auto_now_add=True)

# #     def __str__(self):
# #         return self.body[0:50]

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        return self.create_user(email, username, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
