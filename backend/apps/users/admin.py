from django.contrib import admin
from .models import User, Company
from django.contrib.auth.admin import UserAdmin

admin.site.register(User, UserAdmin)
admin.site.register(Company)