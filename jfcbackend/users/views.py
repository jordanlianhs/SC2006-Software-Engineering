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
from django.db.models import Q
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage

# for email verification token
from .tokens import account_activation_token

# for registration module
from .forms import UserRegistrationForm, UserLoginForm, UserUpdateProfileForm, SetPasswordForm, PasswordResetForm
 
# for user authentication
from .decorators import user_not_authenticated

from rest_framework.response import Response 
from rest_framework.decorators import api_view
from .models import CustomUser
from .serializers import AccountSerializer

# frontend pages
<<<<<<< Updated upstream
#from jfcproperty.src.components.login import index.jsx
=======
>>>>>>> Stashed changes

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
            user.is_active = False 
            user.username = user.username.lower()
            user.save()

            activateEmail(request, user, form.cleaned_data.get('email'))

            #login(request, user)
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
    message = render_to_string('activate_account.html', {
        'user': user.username,
        'domain': get_current_site(request).domain,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': account_activation_token.make_token(user),
        'protocol': 'https' if request.is_secure() else 'http'
    })

    email = EmailMessage(mail_subject, message, to=[to_email])
    #print(email.from_email)
    if email.send():
        messages.success(request, f'Dear {user}, please go to your email {to_email} inbox and click on received activation link to confirm and complete the registration. Note: Check your spam folder if you do not see it in your inbox.')
    else:
        messages.error(request, f'Error sending email to {to_email}, check if you typed it correctly.')

def activate(request, uidb64, token):
    User = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except:
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()

        messages.success(request, 'Thank you for your email confirmation. Now you can login into your account.')

        return redirect('login')
    else:
        messages.error(request, 'Activation link is invalid!')

    return redirect('home')

def profile(request, username):
    if request.method == 'POST':
        user = request.user
        form = UserUpdateProfileForm(request.POST, request.FILES, instance=user)
        if form.is_valid():
            user_form = form.save()
            messages.success(request, f'{user_form.username}, your profile has been updated successfully!')
            return redirect('profile', user_form.username)
        else:
            for error in list(form.errors.values()):
                print(request, error)

    user = get_user_model().objects.filter(username=username).first()
    if user:
        form = UserUpdateProfileForm(instance=user)
        return render(
            request=request,
            template_name='profile.html',
            context={'form':form}
        )
    
    return redirect('home')

@login_required
def password_change(request):
    user = request.user 
    if request.method == 'POST':
        form = SetPasswordForm(user, request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Your password has been changed.")
            return redirect('login')
        else:
            for error in list(form.errors.values()):
                messages.error(request, error)


    form = SetPasswordForm(user)
    return render(request, 'password_reset_confirm.html', {'form': form})

@user_not_authenticated
def password_reset_request(request):
    if request.method == 'POST':
        form = PasswordResetForm(request.POST)
        if form.is_valid():
            user_email = form.cleaned_data['email']
            associated_user = get_user_model().objects.filter(Q(email=user_email)).first()
            if associated_user:
                subject = 'JFC Account - Password Reset Request'
                message = render_to_string('template_reset_password.html', {
                    'user': associated_user,
                    'domain': get_current_site(request).domain,
                    'uid': urlsafe_base64_encode(force_bytes(associated_user.pk)),
                    'token': account_activation_token.make_token(associated_user),
                    'protocol': 'https' if request.is_secure() else 'http'
                })
                email = EmailMessage(subject, message, to=[associated_user.email])
                #print(email.from_email)
                if email.send():
                    messages.success(request, 
                        """
                        Password reset email sent.
                        We have emailed you instructions for setting your password, if an account exists with the email you entered. 
                        You should receive them shortly. If you do not receive an email, please make sure you have entered the email 
                        address you have registered with, and check your spam folder.
                        """
                    )
                else:
                    messages.error(request, f'Error sending email to {associated_user.email}, SERVER PROBLEM')

        
    form = PasswordResetForm()
    return render(request=request, template_name='password_reset.html', context={'form': form})

def passwordResetConfirm(request, uidb64, token):
    User = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except Exception as e:
        print(e)
        user = None

    print(user,account_activation_token.check_token(user, token))
    if user is not None and account_activation_token.check_token(user, token):
        if request.method == 'POST':
            form = SetPasswordForm(user, request.POST)
            if form.is_valid():
                form.save()
                messages.success(request, 'Your password has been set. You may go ahead and log in now.')
                return redirect('home')
            else:
                for error in list(form.errors.values()):
                    messages.error(request, error)

        user.is_active = True
        user.save()

        messages.success(request, 'Thank you for your email confirmation. Now you can login into your account.')
        form = SetPasswordForm(user)
        return render(request, 'password_reset_confirm.html', {'form': form})
    else:
        messages.error(request, 'Reset password link is expired!')

    messages.error(request, 'Something went wrong, redirecting back to homepage')
    return redirect('home')