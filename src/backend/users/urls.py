from django.urls import include, path
from . import views

urlpatterns = [
    path('accounts/login/', views.custom_login, name='login'),
    path('account/', include('django.contrib.auth.urls')),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('register/', views.register, name='register'),
]