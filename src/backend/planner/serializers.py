from .models import TrainingPlan
from rest_framework import serializers

class TrainingPlanListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingPlan
        fields = ['id', 'user', 'creation_date']

class TrainingPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingPlan
        fields = [ "id", "user", "creation_date", "doc_json", "plan_json"]