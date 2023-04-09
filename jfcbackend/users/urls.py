from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    path('get_csrf_token/', views.get_csrf_token, name='get_csrf_token'),  

    path('login/', views.login_view, name='login'),   
    path('logout/', views.logoutUser, name='logout'),

    path('register/', views.register, name='register'),
    path('activate/<uidb64>/<token>/', views.activate, name='activate'),

    # path('profile/<username>/', views.profile, name='profile'),
    path('edit-profile/<username>/', views.edit_profile, name='edit_profile'),
    path('password_change/', views.password_change, name='password_change'),

    path('password_reset/', views.forgot_password_email, name='password_reset'),
    path('reset/<uidb64>/<token>/', views.passwordResetConfirm, name='password_reset_confirm'), 

    path('fav/<int:id>/', views.favourite_add, name="favourite_add"),
    path('profile/<username>/favourites/', views.favourites_list, name="favourites_list"),
    path('', views.home, name='home'),

    path('get_username/', views.get_username, name='get_username'),
]
