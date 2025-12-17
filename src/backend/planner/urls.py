from django.urls import path

from . import views


urlpatterns = [
    path('create_training_plan/', views.create_training_plan, name='create_training_plan'),
    path('list_training_plans/', views.list_training_plans, name='list_training_plans'),
    path('get_training_plan/', views.get_training_plan, name='get_training_plan')
]