from django.conf import settings
from django.db import transaction

from urllib import parse

from .models import Company, User, Roles
from apps.common.services import generate_token, send_formatted_email, generate_hash_token, send_sms
from apps.common.exceptions import BadRequestException

#region AUTH FLOWS -------------------------------------------------#


@transaction.atomic
def register_user(data):
    # user registration logic goes here

    user = User()

    return user

def delete_user(user_id):
    user: User = User.objects.get(pk=user_id)
    user.is_active = False
    user.save()

    return user

#endregion ---------------------------------------------------------#
