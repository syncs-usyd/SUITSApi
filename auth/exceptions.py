from flask_restful import HTTPException

class IncorrectLoginException(HTTPException):
    code = 401
    description = "Incorrect login."

class BadTokenException(HTTPException):
    code = 400
    description = "Authorization token is either missing or cannot be validated."

class AuthHeaderNoBearerException(HTTPException):
    code = 400
    description = "Authorization header must start with the 'Bearer' prefix."
