from rest_framework.exceptions import APIException

class BadRequestException(APIException):
    status_code = 400
    default_detail = 'Request data does not make sense'
    default_code = 'BAD_REQUEST'