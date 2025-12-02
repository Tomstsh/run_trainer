from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):

    pass
    def __str__(self):
        return self.username

class UserProfile(models.Model):

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile', unique=True)
    date_of_birth = models.DateField()
    sex = models.CharField(max_length=14, choices=[("M", "male"), ("F", "female"), ("P", "prefer not to say")])
    height_cm = models.FloatField()
    weight_kg = models.FloatField()
    fitness_level = models.CharField(max_length=12, choices=[("B", "beginner" ), ("I","intermediate"), ("A", "advanced"), ("E", "elite")])
    running_experience = models.CharField(max_length=12, choices=[("B", "beginner"), ("I", "intermediate"), ("A","advanced"), ("E", "elite")])
    injury_history = models.TextField(null=True, blank=True)
    medical_conditions = models.TextField(null=True, blank=True)
