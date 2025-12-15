from django.db import models
from users.models import CustomUser

# Create your models here.

class TrainingPlan(models.Model):

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    creation_date = models.DateField(auto_now_add=True)
    doc_json = models.JSONField()
    plan_json = models.JSONField()