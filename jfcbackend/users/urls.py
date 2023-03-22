from django.urls import path
from django.http import HttpResponse
from . import views

def home(request):
    return HttpResponse('Home Page')

urlpatterns = [
    path('login/', views.custom_login, name='login'),
    path('logout/', views.logoutUser, name='logout'),
    path('register/', views.registerPage, name='register'),
    path('profile/<username>', views.profile, name='profile'),
    path('activate/<uidb64>/<token>', views.activate, name='activate'),
    path('password_change/', views.password_change, name='password_change'),
    path('password_reset/', views.password_reset_request, name='password_reset'),
    path('reset/<uidb64>/<token>', views.passwordResetConfirm, name='password_reset_confirm'),  

    path('', views.home, name='home'),
    #path('', views.getRoutes, name = "routes"),
    path('accounts/', views.getAccounts, name = 'accounts'),
    path('accounts/<str:primary_key>/', views.getAccount, name = 'account'),
]
