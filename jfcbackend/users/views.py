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

from .models import CustomUser
from .serializers import AccountSerializer

# for favourites
from pricePrediction.models import HousePrice
from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect, HttpResponse
from django.views.decorators.csrf import csrf_exempt

def home(request):
    return render(request, 'home.html')


# Note: For Django redirect('name'), use app name -> redirect('users:home')
@login_required
def logoutUser(request):
    logout(request)
    response = HttpResponseRedirect('http://127.0.0.1:3000')
    response.delete_cookie('username')
    response.delete_cookie('email')
    return response

# Note: For Django redirect('name'), use app name -> redirect('users:home')
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
                response = HttpResponseRedirect('http://127.0.0.1:3000')
                response.set_cookie('username', user.username)
                response.set_cookie('email', user.email)
                return response
                #request.session['csrftoken'] = request.COOKIES.get('csrftoken')
                #return redirect('users:home')
        else:
            for error in list(form.errors.values()):
                messages.error(request, error)
    
    form = UserLoginForm()

    #return render_nextjs_page_sync(request)
    return render(request, 'login_register.html', {'form': form, 'page': page})

from django.http import JsonResponse

def get_username(request):
    username = request.session.get('username')
    #csrftoken = request.session.get('csrftoken')
    if username:
        return JsonResponse({'username': username})
    else:
        return JsonResponse({'error': 'User is not logged in.'}, status=401)


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

            response = HttpResponseRedirect('http://127.0.0.1:8000/login/')
            response.set_cookie('username', user.username)
            response.set_cookie('email', user.email)
            return response

            #login(request, user)
            return redirect('users:home')
        else:
            for error in list(form.errors.values()):
                print(request, error)
    else:
        form = UserRegistrationForm()
    
    #return render_nextjs_page_sync(request)
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

        return redirect('users:login')
    else:
        messages.error(request, 'Activation link is invalid!')

    return redirect('users:home')

def profile(request, username):
    if request.method == 'POST':
        user = request.user
        form = UserUpdateProfileForm(request.POST, request.FILES, instance=user)
        if form.is_valid():
            user_form = form.save()
            messages.success(request, f'{user_form.username}, your profile has been updated successfully!')
            return redirect('users:profile', user_form.username)
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
    
    return redirect('users:home')

@login_required
def password_change(request):
    user = request.user 
    if request.method == 'POST':
        form = SetPasswordForm(user, request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Your password has been changed.")
            return redirect('users:login')
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
                return redirect('users:home')
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
    return redirect('users:home')

@csrf_exempt
@login_required
def favourite_add(request, id):
    house = get_object_or_404(HousePrice, id=id)
    # checking to see if the house favourite list contains the user's username
    # if username in house favourite's list, means user favourited before
    if house.favourites.filter(id=request.user.id).exists():
        print("exists when adding to favourotes")
        house.favourites.remove(request.user)
    else:
        house.favourites.add(request.user)
    #return HttpResponse("success")
    return HttpResponseRedirect(request.META['HTTP_REFERER'])

@login_required
def favourites_list(request, username):
    new = HousePrice.objects.filter(favourites=request.user)
    return render(request, "favourites.html", {'new': new})