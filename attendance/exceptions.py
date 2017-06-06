from flask_restful import HTTPException

class NotFoundException(HTTPException):
    code = 404
    description = "This attendance resource could not be found"

class AttendanceExistsException(HTTPException):
    code = 400
    description = "An attendance for this member and event already exists."

class MemberMissingException(HTTPException):
    code = 400
    description = "This member does not exist"

class EventMissingException(HTTPException):
    code = 400
    description = "This event does not exist"
