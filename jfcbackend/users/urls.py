from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    path('login/', views.custom_login, name='login'),
    path('logout/', views.logoutUser, name='logout'),
    path('register/', views.registerPage, name='register'),
    path('profile/<username>/', views.profile, name='profile'),
    path('activate/<uidb64>/<token>/', views.activate, name='activate'),
    path('password_change/', views.password_change, name='password_change'),
    path('password_reset/', views.password_reset_request, name='password_reset'),
    path('reset/<uidb64>/<token>/', views.passwordResetConfirm, name='password_reset_confirm'), 

    path('fav/<int:id>/', views.favourite_add, name="favourite_add"),
    path('profile/<username>/favourites/', views.favourites_list, name="favourites_list"),
    path('', views.home, name='home'),

    path('get_username/', views.get_username, name='get_username'),

    path('accounts/', views.getAccounts, name = 'accounts'),
    path('accounts/<str:primary_key>/', views.getAccount, name = 'account'),
]