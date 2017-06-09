from flask_restful import HTTPException

class IncorrectLoginException(HTTPException):
    code = 401
    description = "Incorrect login."

class BadTokenException(HTTPException):
    code = 401
    description = "Authorization token is either missing or cannot be validated."

class AuthHeaderNoBearerException(HTTPException):
    code = 401
    description = "Authorization header must start with the 'Bearer' prefix."

class NoAuthHeaderException(HTTPException):
    code = 401
    description = "Authorization header is missing"
