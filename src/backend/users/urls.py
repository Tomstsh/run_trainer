from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"admin-users", views.CustomUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('accounts/login/', views.custom_login, name='login'),
    path('account/', include('django.contrib.auth.urls')),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('register/', views.register, name='register'),
]