from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"admin-users", views.CustomUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.register, name='register'),
]