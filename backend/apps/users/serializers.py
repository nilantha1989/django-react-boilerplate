from abc import ABC

from rest_framework import serializers

from .models import Company, User, Roles


class AuthRegisterSerializer(serializers.Serializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.CharField(write_only=True)
    company = CompanySerializer(required=False)
    job_title = serializers.CharField(max_length=150, required=True)

    class Meta:
        model = User
        exclude = [
            'username', 'is_superuser', 'last_login', 'is_staff', 'groups', 'user_permissions'
        ]
