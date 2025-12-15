from django.urls import path

from . import views


urlpatterns = [
    path('create_training_plan/', views.create_training_plan, name='create_training_plan'),
]