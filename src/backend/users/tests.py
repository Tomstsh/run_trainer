from django.test import TestCase
from django.urls import reverse
from .models import CustomUser, UserProfile

# Create your tests here.


class UserAPITests(TestCase):

    good_user =  {
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

    def test_register_user(self):
        response = self.client.post(reverse('register'), self.good_user)
        self.assertEqual(response.status_code, 201)

        user = CustomUser.objects.get(username=self.good_user['username'])
        self.assertIsNotNone(user)
        self.assertEqual(user.email, self.good_user['email'])

        response = self.client.post(reverse("token_obtain_pair"), {
            "username": self.good_user['username'],
            "password": self.good_user['password']
        })

        self.assertEqual(response.status_code, 200)
    
    def test_create_user_profile(self):
        response = self.client.post(reverse('register'), self.good_user)
        user_id = response.data['id']

        user_profile = { **self.good_user_profile, "user": user_id }
        response = self.client.post(reverse('create_user_profile'), user_profile)
        self.assertEqual(response.status_code, 201)

        user_profile_db = UserProfile.objects.get(user__id=user_id)
        self.assertIsNotNone(user_profile_db)
        self.assertEqual(user_profile_db.height_cm, self.good_user_profile['height_cm'])
    
    def test_get_user_data(self):
        response = self.client.post(reverse('register'), self.good_user)
        user_id = response.data['id']

        response = self.client.post(reverse('get_user_data'), { "user_id": user_id })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['profile'], None)

        user_profile = { **self.good_user_profile, "user": user_id }
        self.client.post(reverse('create_user_profile'), user_profile)

        response = self.client.post(reverse('get_user_data'), { "user_id": user_id })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['profile']['height_cm'], self.good_user_profile['height_cm'])
    