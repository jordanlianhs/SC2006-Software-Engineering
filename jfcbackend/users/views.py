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

from .models import User
from .serializers import AccountSerializer

# for favourites
from pricePrediction.models import HousePrice
from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect, HttpResponse
from django.views.decorators.csrf import csrf_exempt

# for react login
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.middleware import csrf
from django.http import JsonResponse
from django.contrib.auth import update_session_auth_hash

User = get_user_model()

def home(request):
    return render(request, 'home.html')

# Note: For Django redirect('name'), use app name -> redirect('users:home')
@login_required
def logoutUser(request):
    logout(request)
    response = HttpResponse("success")
    response.delete_cookie('username')
    response.delete_cookie('email')
    return response

def get_csrf_token(request):
    print('running get csrf token')
    token = csrf.get_token(request)
    return JsonResponse({'csrf_token': token})

@ensure_csrf_cookie
@require_POST
def login_view(request):
    email = request.POST.get('email')
    password = request.POST.get('password')

    # check if user has verified their account
    if User.objects.filter(username=email, is_active=False):
        print('return not verified')
        return JsonResponse({'verified_acct': False})

    user = authenticate(request, username=email, password=password)
    # if user exists
    if user is not None:
        login(request, user)
        response = JsonResponse({'success': True})
        response.set_cookie('username', user.username)
        response.set_cookie('email', user.email)
    # if user does not exist
    else:
        response = JsonResponse({'success': False})
    # not sure why here is different token
    response['X-CSRFToken'] = csrf.get_token(request)
    return response

# # Note: For Django redirect('name'), use app name -> redirect('users:home')
# @user_not_authenticated
# def custom_login(request):
#     page = 'login'
#     if request.method == 'POST':
#         form = UserLoginForm(request=request, data=request.POST)
#         if form.is_valid():
#             user = authenticate(
#                 username = form.cleaned_data['username'],
#                 password = form.cleaned_data['password'],
#             )
#             if user is not None:
#                 login(request, user)
#                 messages.success(request, f"Hello {user.username}! You have successfully logged in.")
#                 response = HttpResponseRedirect('http://127.0.0.1:3000')
#                 response.set_cookie('username', user.username)
#                 response.set_cookie('email', user.email)
#                 return response
#                 #request.session['csrftoken'] = request.COOKIES.get('csrftoken')
#                 #return redirect('users:home')
#         else:
#             for error in list(form.errors.values()):
#                 messages.error(request, error)
    
#     form = UserLoginForm()

#     #return render_nextjs_page_sync(request)
#     return render(request, 'login_register.html', {'form': form, 'page': page})



def get_username(request):
    username = request.session.get('username')
    #csrftoken = request.session.get('csrftoken')
    if username:
        return JsonResponse({'username': username})
    else:
        return JsonResponse({'error': 'User is not logged in.'}, status=401)

@csrf_exempt
#@user_not_authenticated
def register(request):
    print("running register view")
    if request.method == 'POST':

        email = request.POST.get('email')
        username = request.POST.get('username')
        password = request.POST.get('password')

        username = username.lower()

        if User.objects.filter(username=username).exists():
            return JsonResponse({'success': False, 'message': 'username_exists'})
        elif User.objects.filter(email=email).exists():
            return JsonResponse({'success': False, 'message': 'email_exists'})
        else:
            user = User.objects.create_user(email=email, username=username, password=password)
            activateEmail(request, user, email)
            print("email sent")
            return JsonResponse({'success': True})
    return JsonResponse({'success': False})

# @user_not_authenticated
# def registerPage(request):
#     form = UserCreationForm()

#     if request.method == 'POST':
#         form = UserRegistrationForm(request.POST)
#         if form.is_valid():
#             user = form.save(commit=False)
#             user.is_active = False 
#             user.username = user.username.lower()
#             user.save()

#             activateEmail(request, user, form.cleaned_data.get('email'))

#             response = HttpResponseRedirect('http://127.0.0.1:8000/login/')
#             response.set_cookie('username', user.username)
#             response.set_cookie('email', user.email)
#             return response

#             #login(request, user)
#             return redirect('users:home')
#         else:
#             for error in list(form.errors.values()):
#                 print(request, error)
#     else:
#         form = UserRegistrationForm()
    
#     #return render_nextjs_page_sync(request)
#     return render(request, 'login_register.html', {'form': form})

def activateEmail(request, user, to_email):
    mail_subject = 'Activate your JFC account'
    message = render_to_string('activate_account.html', {
        'user': user,
        'domain': get_current_site(request).domain,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': account_activation_token.make_token(user),
        'protocol': 'https' if request.is_secure() else 'http'
    })

    email = EmailMessage(mail_subject, message, to=[to_email])
    #print(email.from_email)
    if email.send():
        return HttpResponse({'verify_email_sent': True})
        messages.success(request, f'Dear {user}, please go to your email {to_email} inbox and click on received activation link to confirm and complete the registration. Note: Check your spam folder if you do not see it in your inbox.')
    else:
        return HttpResponse({'verify_email_sent': False})
        messages.error(request, f'Error sending email to {to_email}, check if you typed it correctly.')

def activate(request, uidb64, token):
    print("running activate")
    User = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except:
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        print("found user")
        user.is_active = True
        user.save()

        print('Thank you for your email confirmation. Now you can login into your account.')

        return HttpResponse('You have successfully verified your JFC account. You may close this window and login with your new account. Thank You.')
    else:
        print("no user")
        return HttpResponse('The verification link you clicked is not valid or has expired. Please check your inbox and click on the latest verification link.')

@require_POST
@login_required
def edit_profile(request, username):
    try:
        print('running edit profile')
        if request.method == 'POST':
            # Get the updated data from the request
            username = request.POST.get('username')
            email = request.POST.get('email')

            # Update the user's profile with the new data
            user = request.user
            user.username = username
            user.email = email
            user.save()
            print('saved new user details')

            # Return a JSON response indicating success
            return JsonResponse({'success': True})
    except Exception as e:
        return JsonResponse({'success': False})

# def profile(request, username):
#     if request.method == 'POST':
#         user = request.user
#         form = UserUpdateProfileForm(request.POST, request.FILES, instance=user)
#         if form.is_valid():
#             user_form = form.save()
#             messages.success(request, f'{user_form.username}, your profile has been updated successfully!')
#             return redirect('users:profile', user_form.username)
#         else:
#             for error in list(form.errors.values()):
#                 print(request, error)

#     user = get_user_model().objects.filter(username=username).first()
#     if user:
#         form = UserUpdateProfileForm(instance=user)
#         return render(
#             request=request,
#             template_name='profile.html',
#             context={'form':form}
#         )
    
#     return redirect('users:home')

@require_POST
@login_required
def password_change(request):
    try:
        print('running user is logged in, change pw')
        if request.method == 'POST':
            # Get the updated data from the request
            password = request.POST.get('password')

            # Update the user's profile with the new data
            user = request.user
            user.set_password(password)
            user.save()
            update_session_auth_hash(request, user)
            messages.success(request, 'Your password has been successfully updated!')

            # Return a JSON response indicating success
            return JsonResponse({'success': True})
    except Exception as e:
        return JsonResponse({'success': False})

# when user wants to change their password when they are logged in
# @login_required
# def password_change(request):
#     user = request.user 
#     if request.method == 'POST':
#         form = SetPasswordForm(user, request.POST)
#         if form.is_valid():
#             form.save()
#             messages.success(request, "Your password has been changed.")
#             return redirect('users:login')
#         else:
#             for error in list(form.errors.values()):
#                 messages.error(request, error)


#     form = SetPasswordForm(user)
#     return render(request, 'password_reset_confirm.html', {'form': form})

# when user clicks on forget password, then sends in their email
@require_POST
def forgot_password_email(request):
    try:
        print('running user is logged in, change pw')
        if request.method == 'POST':
            # Get the updated data from the request
            email = request.POST.get('email')

            associated_user = get_user_model().objects.filter(Q(email=email)).first()
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
                    return JsonResponse({'success': True})
                    messages.success(request, 
                        """
                        Password reset email sent.
                        We have emailed you instructions for setting your password, if an account exists with the email you entered. 
                        You should receive them shortly. If you do not receive an email, please make sure you have entered the email 
                        address you have registered with, and check your spam folder.
                        """
                    )
                else:
                    return JsonResponse({'success': False})
                    messages.error(request, f'Error sending email to {associated_user.email}, SERVER PROBLEM')
            # Return a JSON response indicating success
            return JsonResponse({'user_dont_exist': False})
    except Exception as e:
        return JsonResponse({'success': False})

# @user_not_authenticated
# def password_reset_request(request):
#     if request.method == 'POST':
#         form = PasswordResetForm(request.POST)
#         if form.is_valid():
#             user_email = form.cleaned_data['email']
#             associated_user = get_user_model().objects.filter(Q(email=user_email)).first()
#             if associated_user:
#                 subject = 'JFC Account - Password Reset Request'
#                 message = render_to_string('template_reset_password.html', {
#                     'user': associated_user,
#                     'domain': get_current_site(request).domain,
#                     'uid': urlsafe_base64_encode(force_bytes(associated_user.pk)),
#                     'token': account_activation_token.make_token(associated_user),
#                     'protocol': 'https' if request.is_secure() else 'http'
#                 })
#                 email = EmailMessage(subject, message, to=[associated_user.email])
#                 #print(email.from_email)
#                 if email.send():
#                     messages.success(request, 
#                         """
#                         Password reset email sent.
#                         We have emailed you instructions for setting your password, if an account exists with the email you entered. 
#                         You should receive them shortly. If you do not receive an email, please make sure you have entered the email 
#                         address you have registered with, and check your spam folder.
#                         """
#                     )
#                 else:
#                     messages.error(request, f'Error sending email to {associated_user.email}, SERVER PROBLEM')

        
#     form = PasswordResetForm()
#     return render(request=request, template_name='password_reset.html', context={'form': form})


def passwordResetConfirm(request, uidb64, token):
    print('running password reset confirm')
    print('test')
    User = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except Exception as e:
        print(e)
        user = None
        return JsonResponse({'success': False})

    print(user,account_activation_token.check_token(user, token))
    if user is not None and account_activation_token.check_token(user, token):
        if request.method == 'POST':
            password = request.POST.get('password')
            user.set_password(password)
            user.is_active = True
            user.save()
            print('returned success true, pw reset')
            return JsonResponse({'success': True})
        else: 
            return JsonResponse({'success': False})
    else:
        return JsonResponse({'link_expired': True})

# # when user clicks on password reset link in their email
# def passwordResetConfirm(request, uidb64, token):
#     User = get_user_model()
#     try:
#         uid = force_str(urlsafe_base64_decode(uidb64))
#         user = User.objects.get(pk=uid)
#     except Exception as e:
#         print(e)
#         user = None

#     print(user,account_activation_token.check_token(user, token))
#     if user is not None and account_activation_token.check_token(user, token):
#         if request.method == 'POST':
#             form = SetPasswordForm(user, request.POST)
#             if form.is_valid():
#                 form.save()
#                 messages.success(request, 'Your password has been set. You may go ahead and log in now.')
#                 return redirect('users:home')
#             else:
#                 for error in list(form.errors.values()):
#                     messages.error(request, error)

#         user.is_active = True
#         user.save()

#         messages.success(request, 'Thank you for your email confirmation. Now you can login into your account.')
#         form = SetPasswordForm(user)
#         return render(request, 'password_reset_confirm.html', {'form': form})
#     else:
#         messages.error(request, 'Reset password link is expired!')

#     messages.error(request, 'Something went wrong, redirecting back to homepage')
#     return redirect('users:home')

@csrf_exempt
@login_required
def favourite_add(request, id):
    print('running fav add')
    try:
        house = get_object_or_404(HousePrice, id=id)
        # checking to see if the house favourite list contains the user's username
        # if username in house favourite's list, means user favourited before
        if house.favourites.filter(id=request.user.id).exists():
            print("removing house")
            house.favourites.remove(request.user)
        else:
            print("adding house")
            house.favourites.add(request.user)
        #return HttpResponse("success")
        return JsonResponse({'success': True})
    except Exception as e:
        return JsonResponse({'success': False})


    return HttpResponseRedirect(request.META['HTTP_REFERER'])

# @login_required
# def favourites_list(request, username):
#     new = HousePrice.objects.filter(favourites=request.user)
#     return new

@login_required
def favourites_list(request, username):
    print('running favourites list')
    print('user_id: ',request.user.id)
    fav_list = HousePrice.objects.filter(favourites=request.user.id)
    print('fav_list: ', fav_list)
    fav_list_json = []
    for fav in fav_list:
        fav_list_json.append({
            'id': fav.id,
            'blockNumber': fav.block,
            'flatModel': fav.flat_model,
            'flatType': fav.flat_type,
            'floorArea': fav.floor_area_sqm,
            'img': "/assets/images/property/fp1.jpg",
            'leaseCommencementDate': fav.lease_commence_date,
            'price': fav.resale_price,
            'price_aft1year': fav.resale_price_aft1year,
            'price_aft2year': fav.resale_price_aft2year,
            'price_aft3year': fav.resale_price_aft3year,
            'price_aft4year': fav.resale_price_aft4year,
            'price_aft5year': fav.resale_price_aft5year,
            'storeyRange': fav.storey_range,
            'streetName': fav.street_name,
            'town': fav.town,
        })
    return JsonResponse({'favList': fav_list_json})
