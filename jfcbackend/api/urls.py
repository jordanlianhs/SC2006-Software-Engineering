from django.urls import path
from . import views
# This is for a specific app


urlpatterns = [
    path('', views.getRoutes, name = "routes"),
    path('accounts/', views.getAccounts, name = 'accounts'),
    path('accounts/<str:primary_key>/', views.getAccount, name = 'account'),
    path('home/',views.home, name = "home" ),
    path('room/', views.room, name = "room"),
]
