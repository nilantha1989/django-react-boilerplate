#!/usr/bin/python
# -*- coding: utf-8 -*-
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework.status import HTTP_500_INTERNAL_SERVER_ERROR
import logging

logger = logging.getLogger("Exception Handler")

def custom_exception_handler(exc, context):

    logger.exception(exc)

    # Call REST framework's default exception handler first,
    # to get the standard error response.
    
    response = exception_handler(exc, context)

    # Now add the HTTP status code to the response.

    if response is not None:
        errors = []
        if isinstance(response.data, list):
            message = response.data
        else:
            message = response.data.get('detail')
        if not message:
            response.data = {
                'data': [],
                'message': 'Validation Error',
                'errors': response.data,
                'status': 'failure',
                }
        else:
            response.data = {
                'data': [],
                'message': message,
                'errors': [message],
                'status': 'failure',
            }

        return response
    
    return Response({ "message": str(exc) }, status=HTTP_500_INTERNAL_SERVER_ERROR)
