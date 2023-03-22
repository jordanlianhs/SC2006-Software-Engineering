from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, SetPasswordForm, PasswordResetForm
from django.contrib.auth import get_user_model

class UserRegistrationForm(UserCreationForm):
    email = forms.EmailField(help_text='A valid email address.', required=True)

    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'password1', 'password2']

    def save(self, commit=True):
        user = super(UserRegistrationForm, self).save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()

        return user
    
class UserLoginForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):    
        super(UserLoginForm, self).__init__(*args, **kwargs)
    
    username = forms.CharField(widget=forms.TextInput(
        attrs = {'class': 'form-control', 'placeholder': 'Username or Email'}), 
        label = 'Enter username or email'
    )

    password = forms.CharField(widget=forms.PasswordInput(
        attrs = {'class': 'form-control', 'placeholder': 'Password'})
    )

class UserUpdateProfileForm(forms.ModelForm):
    email = forms.EmailField()

    class Meta:
        model = get_user_model()
        fields = ['username', 'email']

class SetPasswordForm(SetPasswordForm):
    class Meta:
        model = get_user_model()
        fields = ['new_password1', 'new_password2']

class PasswordResetForm(PasswordResetForm):
    class Meta:
        model = get_user_model()
        fields = ['new_password1', 'new_password2']