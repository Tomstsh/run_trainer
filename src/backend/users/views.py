from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions, viewsets

from .models import CustomUser, UserProfile
from .serializers import CustomUserSerializer, UserProfileSerializer, UserDataSerializer

# Create your views here.

@api_view(['POST'])
def register(request):
    serialized = CustomUserSerializer(data=request.data)
    if serialized.is_valid():
        created = serialized.create(serialized.validated_data)
        return Response({ **serialized.validated_data, "id": created.id}, status=201)
    else:
        return Response(serialized.errors, status=400)

class CustomUserViewSet(viewsets.ModelViewSet):
    """ API endpoint that allows users to be viewed"""
    queryset = CustomUser.objects.all().order_by('-date_joined')
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAdminUser]

@api_view(['POST'])
def create_user_profile(request):
    serialized = UserProfileSerializer(data=request.data)
    if serialized.is_valid():
        serialized.save()
        return Response(serialized.data, status=201)
    else:
        return Response(serialized.errors, status=400)

@api_view(['POST'])
def get_user_data(request):
    user_id = request.data.get('user_id')

    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return Response({'error': f'User not found: {user_id}'}, status=404)
    
    try:
        profile = UserProfile.objects.get(user=user)
    except UserProfile.DoesNotExist:
        profile = None
    
    serialized = UserDataSerializer({ 'user': user, 'profile': profile })
    return Response(serialized.data, status=200)