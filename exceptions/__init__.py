from flask_restful import HTTPException

class IncorrectLoginException(HTTPException):
    code = 401
    description = "Incorrect login"

class NotFoundException(HTTPException):
    code = 404
    description = "The following resource could not be found"

class AttendanceExistsError(HTTPException):
    code = 400
    description = "An attendance for this member and event already exists."

class MemberOrEventMissing(HTTPException):
    code = 400
    description = "This event or member do not exist"
