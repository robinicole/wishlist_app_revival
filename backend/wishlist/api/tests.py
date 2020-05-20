from django.test import TestCase
from rest_framework.test import APIClient, APITestCase
from django.contrib.auth.models import User

class YourTestClass(APITestCase):
    @classmethod
    def setUp(cls):
        cls.u1 = User.objects.create_user(username='testuser1', password='12345', email="email@email1.com")
        cls.u2 = User.objects.create_user(username='testuser2', password='12345', email="email@email2.com")
        cls.u3 = User.objects.create_user(username='testuser3', password='12345', email="email@email3.com")

    def test_cannot_get_data_without_login(self):
        self.client.login(username="adsad", password="adsda")
        response = self.client.get('/api/my_gifts/')
        self.assertEqual(401, response.status_code)

    def create_a_gift(self, user, gift_name="gift1"):
        self.client.force_authenticate(user=user)
        response = self.client.get('/api/my_gifts/')
        self.assertEqual(200, response.status_code)
        init_len = len(response.json())
        self.client.post('/api/my_gifts/', {"name": gift_name})
        response = self.client.get('/api/my_gifts/')
        self.assertEqual(200, response.status_code)
        assert len(response.json()) == init_len + 1,  response
        return response

    def test_my_gift_updated_on_sending(self):
        # A first user create a gift
        response = self.create_a_gift(self.u1, 'test')
        self.assertEqual(response.json()[0]['name'], "test")
        # A second user post a gift, so he sees it in his wishlist but not the gift of the other user
        response = self.create_a_gift(self.u2, 'test1')
        self.assertEqual(response.json()[0]['name'], "test1")
        
        # He only sees the gift og the other user 
        response = self.client.get('/api/wishlists/')
        expected_response = {
            'pk': 1,
            'name': 'test',
            'owner':{'email': 'email@email1.com', 'id': 1, 'username': 'testuser1'},
                'offered_by': None
            }
        assert len(response.json()) == 1, response.data
        self.assertEqual(response.json()[0], expected_response)
        # Check that a third user would see both gifts
        response = self.client.force_authenticate(user=self.u3)
        response = self.client.get('/api/wishlists/')
        self.assertEqual(len(response.json()), 2)

    def test_offering_gift(self):
        # A first user adds a gift to his wishlist 
        self.create_a_gift(self.u1)
        # Test that the gifts you want does not appear in your wishlist
        response = self.client.patch('/api/wishlists/1/') 
        assert "error" in response.json()
        response = self.client.get('/api/wishlists/')
        assert len(response.json()) == 0
        response = self.client.get('/api/wishlists/1/')
        assert response.json() == {'detail': 'Not found.'}, response.json()
        # But other users can log in and offer the gift
        response = self.client.force_authenticate(user=self.u2)
        response = self.client.get('/api/wishlists/')
        self.assertEqual(len(response.json()), 1)
        # until they offer it
        response = self.client.patch('/api/wishlists/1/')
        response = self.client.get('/api/wishlists/')
        assert len(response.json()) == 0, response.json()