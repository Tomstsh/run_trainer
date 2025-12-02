from .models import CustomUser, UserProfile
from rest_framework import serializers

class CustomUserSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'id']
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        instance.is_active = True
        
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ['user',
                  'date_of_birth',
                  'sex',
                  'height_cm',
                  'weight_kg',
                  'fitness_level',
                  'running_experience',
                  'injury_history',
                  'medical_conditions'
                  ]

class UserDataSerializer(serializers.Serializer):
    user = CustomUserSerializer(read_only=True)
    profile = UserProfileSerializer(read_only=True)