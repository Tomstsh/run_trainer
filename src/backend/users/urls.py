from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"admin-users", views.CustomUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.register, name='register'),
    path('create_user_profile/', views.create_user_profile, name='create_user_profile'),
    path('get_user_data/', views.get_user_data, name='get_user_data')
]