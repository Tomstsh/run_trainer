from django.db import models
from rest_framework.decorators import api_view
from rest_framework.response import Response

from users.views import _get_user_profile_for_user
from .assistant import assistant
from .models import TrainingPlan

def _create_training_plan(user, race_data):
    ## TODO CLEAN THIS
    profile = _get_user_profile_for_user(user)

    planner_document = {}
    planner_document["raw_fields"] = [{ "description": "race_goals", "raw": race_data.pop("race_goals")}]

    planner_document = { **planner_document, **race_data }

    for field in profile._meta.get_fields():
        if isinstance(field, models.TextField):
            planner_document["raw_fields"].append({ "description": field.name, "raw": getattr(profile, field.name)})
        elif field.name in [ "user", "id"]:
            pass
        else:
            planner_document[field.name] = getattr(profile, field.name)
    
    planner_document["date_of_birth"] = planner_document["date_of_birth"].strftime("%Y-%m-%d")

    cleaned_doc, plan = assistant.generate_plan(planner_document)
    training_plan = TrainingPlan.objects.create(user=user, doc_json=cleaned_doc, plan_json=plan)
    

# Create your views here.

@api_view(['POST'])
def create_training_plan(request):
    user = request.user
    race_data = request.data

    _create_training_plan(user, race_data)
    return Response({"create_training_plan": "success"}, status=200)