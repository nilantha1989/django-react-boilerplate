# -*- coding: utf-8 -*-
from django.test import TestCase
from django.test import Client

from apps.users.services import register_user

BASE_URL = 'http://localhost:8000/api'

class TestUsers(TestCase):

    def setUp(self):
        self.client = Client()

    def test_invalid_login(self):
        res = self.client.post(BASE_URL + '/auth/token/', { "username": "test", "password": "tset" })

        # should be a 401
        self.assertEqual(res.status_code, 401)

    def test_valid_login(self):
        username = "user@mailinator.com"
        password = "abcd1234"

        register_user({ "username": username, "password": password })

        res = self.client.get(BASE_URL + '/auth/token/', { "username": username, "password": password })
        
        # should be 200 with an access and refresh token
        self.assertEqual(res.status_code, 200)