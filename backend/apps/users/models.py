from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

import uuid


class Roles(models.TextChoices):
    # User Roles
    SUPER_ADMIN = 'SUPER_ADMIN', _('SUPER_ADMIN')
    ADMIN = 'ADMIN', _('ADMIN')
    USER = 'USER', _('USER')

class Company(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    logo = models.TextField(null=True, blank=True)
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE,
                              related_name='managing_company', null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(
        max_length=20,
        choices=Roles.choices,
        default=Roles.USER
    )
    company = models.ForeignKey(
        Company, on_delete=models.DO_NOTHING, related_name='users')
    phone = models.CharField(max_length=15, null=True, blank=True)
    job_title = models.CharField(max_length=150, blank=True, null=True)

    created_date = models.DateTimeField(auto_now_add=True)