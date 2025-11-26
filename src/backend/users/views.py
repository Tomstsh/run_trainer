from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions, viewsets

from .models import CustomUser
from .serializers import CustomUserSerializer

# Create your views here.

@api_view(['POST'])
def register(request):
    serialized = CustomUserSerializer(data=request.data)
    if serialized.is_valid():
        serialized.create(serialized.validated_data)
        return Response(serialized.validated_data, status=201)
    else:
        return Response(serialized.errors, status=400)

class CustomUserViewSet(viewsets.ModelViewSet):
    """ API endpoint that allows users to be viewed"""
    queryset = CustomUser.objects.all().order_by('-date_joined')
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAdminUser]