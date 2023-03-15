from django.urls import path
from django.http import HttpResponse


from . import views

def home(request):
    return HttpResponse('Home Page')

urlpatterns = [
    path('login/', views.loginPage, name='login'),
    path('logout/', views.logoutUser, name='logout'),
    path('register/', views.registerPage, name='register'),

    path('', views.home, name='home'),
    #path('', views.getRoutes, name = "routes"),
    path('accounts/', views.getAccounts, name = 'accounts'),
    path('accounts/<str:primary_key>/', views.getAccount, name = 'account'),
]
