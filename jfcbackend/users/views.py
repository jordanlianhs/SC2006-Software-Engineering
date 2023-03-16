# for http redirects and renders
from django.shortcuts import render, redirect

# for user forms
from django.contrib.auth.forms import UserCreationForm

# for login module
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.decorators import login_required

# for email verification
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage

# for email verification token
from .tokens import account_activation_token

# for registration module
from .forms import UserRegistrationForm, UserLoginForm, UserUpdateProfileForm

# for user authentication
from .decorators import user_not_authenticated

from rest_framework.response import Response 
from rest_framework.decorators import api_view
from .models import CustomUser
from .serializers import AccountSerializer

# Create your views here.

# Can add in GET, POST, PUT, DELETE
@api_view(['GET'])

def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    
    return Response(routes)


# Can add in GET, POST, PUT, DELETE
@api_view(['GET'])
def getAccounts(request):
    accounts = Account.objects.all()

    #Pass the data to the serializer
    serializer = AccountSerializer(accounts, many=True)

    return Response(serializer.data)


# Can add in GET, POST, PUT, DELETE
@api_view(['GET'])
def getAccount(request, primary_key):
    accounts = Account.objects.get(id=primary_key)

    #Pass the data to the serializer
    serializer = AccountSerializer(accounts, many=False)

    return Response(serializer.data)


def home(request):
    return render(request, 'home.html')

# @user_not_authenticated
# def registerPage(request):
#     if request.user.is_authenticated:
#         return redirect('home')

#     if request.method == 'POST':
#         username = request.POST.get("username")
#         password = request.POST.get("password")

#         try:
#             user = User.objects.get(username=username)
#         except:
#             messages.error(request, 'User does not exist')

# def loginPage(request):
#     page = 'login'
#     if request.method == 'POST':
#         username = request.POST.get("username").lower()
#         password = request.POST.get("password")

#         try:
#             user = User.objects.get(username=username)
#         except:
#             messages.error(request, 'User does not exist')

#         user = authenticate(request, username=username, password=password)

#         if user is not None: 
#             login(request, user)
#             messages.success(request, f'Hello {user}! You have successfully logged in.')

#             return redirect('home')
        
#         else:
#             messages.error(request, 'Username or password does not exist')

#     context = {'page': page}
#     return render(request, 'login_register.html', context)

@login_required
def logoutUser(request):
    logout(request)
    return redirect('home')


@user_not_authenticated
def custom_login(request):
    page = 'login'
    if request.method == 'POST':
        form = UserLoginForm(request=request, data=request.POST)
        if form.is_valid():
            user = authenticate(
                username = form.cleaned_data['username'],
                password = form.cleaned_data['password'],
            )
            if user is not None:
                login(request, user)
                messages.success(request, f"Hello {user.username}! You have successfully logged in.")
                return redirect('home')
        else:
            for error in list(form.errors.values()):
                messages.error(request, error)
    
    form = UserLoginForm()

    return render(request, 'login_register.html', {'form': form, 'page': page})


@user_not_authenticated
def registerPage(request):
    form = UserCreationForm()

    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.username = user.username.lower()
            user.save()
            login(request, user)
            return redirect('home')
        else:
            for error in list(form.errors.values()):
                print(request, error)
    else:
        form = UserRegistrationForm()
 
    return render(request, 'login_register.html', {'form': form})

@user_not_authenticated
def activateEmail(request, user, to_email):
    mail_subject = 'Activate your JFC account'
    message = render_to_string('template_activate_account.html', {
        'user': user.username,
        'domain': get_current_site(request).domain,
        'uid': urlsafe_base64_decode(force_bytes(user.pk)),
        'token': account_activation_token,
        'protocol': 'https' if request.is_secure() else 'http'
    })
    email = EmailMessage(mail_subject, message, to=[to_email])
    if email.send():
        messages.success(request, f'Dear<b>{user}</b>, please go to your email <b>{to_email}</b> inbox and click on received activation link to confirm and complete the registration. <b>Note:</b> Check your spam folder if you do not see it in your inbox.')
    else:
        messages.error(request, f'Error sending email to {to_email}, check if you typed it correctly.')

def profile(request, username):
    if request.method == 'POST':
        pass

    user = get_user_model().objects.filter(username=username).first()
    if user:
        form = UserUpdateProfileForm(instance=user)
        return render(
            request=request,
            template_name='profile.html',
            context={'form':form}
        )
    
    return redirect('home')