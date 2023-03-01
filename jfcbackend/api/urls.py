from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name = "routes"),
    path('accounts/', views.getAccounts, name = 'accounts'),
    path('accounts/<str:primary_key>/', views.getAccount, name = 'account'),
]
