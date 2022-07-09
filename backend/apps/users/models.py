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

class Vaccine(models.Model):
    vaccine_name=models.CharField(max_lenght=255)
    expiry_date=models.DateField()
    

    
class Pharmacy(models.Model):
    pharmacy_name=models.CharField(max_lenght=255)
    address=models.CharField(max_lenght=255)

class Patient(models.Model):
    patient_name=models.CharField(max_lenght=255)
    email = models.EmailField(unique=True)
    vaccines=models.ManyToManyField(Vaccine)

class PatientVaccine(models.Model):
    vaccine_date=models.DateTimeField()
    vaccine=models.ForeignKey(Vaccine,on_delete=models.PROTECT)
    patient=models.ForeignKey(Patient,on_delete=models.PROTECT)
    pharmacy=models.ForeignKey(Pharmacy,on_delete=models.PROTECT)
    
"""
class Meta:
    unique_together=[['patient','vaccine']
we can use this depending on the requirment
"""
    
class Doctor(models.Model):
    doctor_name=models.CharField(max_lenght=255)
    email=models.EmailField(unique=True)
    
class Availability(models.Model):
    date_and_time=models.DateTimeField()
    doctor=models.ForeignKey(Doctor,on_delete=models.PROTECT)
    
class Appointment(models.Model):
    date_and_time=models.DateTimeField()
    patient=models.ForeignKey(Patient,on_delete=models.PROTECT)
    doctor=models.ForeignKey(Doctor,on_delete=models.PROTECT)
    
    
class FormAssessement(models.Model):
    question=models.TextField()
    answer=models.TextField()
    patient=models.ForeignKey(Patient,on_delete=models.PROTECT)
    

    
class Prescription(models.Model):
    issued_datetime=models.DateTimeField()
    doctor=models.ForeignKey(Doctor,on_delete=models.PROTECT)
    patient=models.ForeignKey(Patient,on_delete=models.PROTECT)
    pharmacy=models.ForeignKey(Pharmacy,on_delete=models.PROTECT)
    

class Invoice(models.Model):
    total=models.DecimalField(max_digit=6,decimal_places=2)
    date_and_time=models.DateTimeField()
    patient=models.ForeignKey(Patient,on_delete=models.PROTECT)
    pharmacy=models.ForeignKey(Pharmacy,on_delete=models.PROTECT)
    prescription=models.ForeignKey(Prescription,on_delete=models.PROTECT)

class Drug(models.Model):
    drug_name=models.CharField(max_lenght=255)
    strength=models.CharField(max_lenght=25)
    
class PrescriptionDrug(models.Model):
    drug=models.ForeignKey(Drug,on_delete=models.PROTECT)
    prescription=models.ForeignKey(Prescription,on_delete=models.PROTECT)
    drug=models.ManyToManyField(Drug)
