from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string 
from django.core.mail import EmailMultiAlternatives

from random import randint
import hashlib

from twilio.rest import Client

twilio_client = Client(settings.TWILIO_SID, settings.TWILIO_TOKEN)

def generate_token(token_length):
    range_start = 10**(token_length-1)
    range_end = (10**token_length)-1
    return randint(range_start, range_end)

def generate_hash_token(prefix=""):
    token = generate_token(25)
    m = hashlib.md5()
    m.update((prefix+str(token)).encode())
    return m.hexdigest()

def send_formatted_email(template, subject, to, data):
    plain_version = 'emails/auth/%s.txt' % template 
    html_version = 'emails/auth/%s.html' % template

    # plain_message = render_to_string(plain_version, { 'data': data, })
    plain_message = render_to_string(html_version, { 'data': data, })
    html_message = render_to_string(html_version, { 'data': data, })

    message = EmailMultiAlternatives(subject, plain_message, settings.EMAIL_FROM_ADDRESS, [to])
    message.attach_alternative(html_message, "text/html")
    message.send()


def send_sms(message, to):
    try:
        message = twilio_client.messages.create(
                to=to, 
                from_=settings.TWILIO_SENDER,
                body=message
            )
    except Exception as e:
        print("Error in SMS", e)
    