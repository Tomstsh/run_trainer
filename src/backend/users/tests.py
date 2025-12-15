from rest_framework.test import APITestCase
from django.urls import reverse
from .views import _get_user_profile_for_user
from .models import CustomUser, UserProfile
from rest_framework_simplejwt.tokens import RefreshToken

# Create your tests here.


class UserAPITests(APITestCase):

    good_user_data =  {
            "username": 'testuser',
            "password": 'testpass123',
            "email": "testemail@tests.com"
        }
    
    good_user_profile = {
        "date_of_birth": "1990-01-01",
        "sex": "M",
        "height_cm": 180,
        "weight_kg": 75,
        "fitness_level": "I",
        "running_experience": "B",
        "injury_history": "None",
        "medical_conditions": "None"
    }

    def setUp(self):
        self.user = CustomUser.objects.create_user(
            username="testuser1",
            password="pass"
        )
        refresh = RefreshToken.for_user(self.user)
        self.token = f"Bearer {str(refresh.access_token)}"

    def test_register_user(self):
        response = self.client.post(reverse('register'), self.good_user_data)
        self.assertEqual(response.status_code, 201)

        user = CustomUser.objects.get(username=self.good_user_data['username'])
        self.assertIsNotNone(user)
        self.assertEqual(user.email, self.good_user_data['email'])

        response = self.client.post(reverse("token_obtain_pair"), {
            "username": self.good_user_data['username'],
            "password": self.good_user_data['password']
        })

        self.assertEqual(response.status_code, 200)
    
    def test_create_user_profile(self):

        user_profile = { **self.good_user_profile }
        response = self.client.post(reverse('create_user_profile'), 
                                    user_profile,
                                    format="json",
                                    HTTP_AUTHORIZATION=self.token)
        self.assertEqual(response.status_code, 201)

        user_profile_db = UserProfile.objects.get(user=self.user)
        self.assertIsNotNone(user_profile_db)
        self.assertEqual(user_profile_db.height_cm, self.good_user_profile['height_cm'])
    
    def test_get_user_data(self):

        response = self.client.get(reverse('get_user_data'), HTTP_AUTHORIZATION=self.token)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['profile'], None)

        user_profile = { **self.good_user_profile }
        self.client.post(reverse('create_user_profile'), user_profile, format="json", HTTP_AUTHORIZATION=self.token)

        response = self.client.get(reverse('get_user_data'), HTTP_AUTHORIZATION=self.token)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['profile']['height_cm'], self.good_user_profile['height_cm'])
    
    def test_get_user_profile_for_user_serialized(self):
        profile = UserProfile.objects.create(**{ "user": self.user, **self.good_user_profile})

        fetch_profile = _get_user_profile_for_user(self.user, serialized=True)
        
        del fetch_profile['user']
        self.assertEqual(fetch_profile, self.good_user_profile)
    