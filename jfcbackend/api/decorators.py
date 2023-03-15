from django.shortcuts import redirect

def user_not_authenticated(function=None, redirect_url='/'):
    def decorator(view_func):
        # checks if user is authenticated, else return default function
        def _wrapped_view(request, *args, **kwargs):
            if request.user.is_authenticated:
                return redirect(redirect_url)
            return view_func(request, *args, **kwargs)
        
        return _wrapped_view
    
    if function:
        return decorator(function)
    
    return decorator


# def login_required(
#         function=None, 
#         redirect_field_name=REDIRECT_FIELD_NAME,
#         login_url=None
# ):
#     """
#     Decorator for views that checks that the user is logged in, redirecting to the login page if necessary.
#     """
#     actual_decorator = user_passes_test(
#         lambda u: u.is_authenticated,
#         login_url=login_url,
#         redirect_field_name=redirect_field_name,
#     )
#     if function:
#         return actual_decorator(function)
#     return actual_decorator