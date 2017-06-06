from flask_restful import HTTPException

class IncorrectLoginException(HTTPException):
    code = 401
    description = "Incorrect login."
