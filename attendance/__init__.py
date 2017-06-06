from app import api

from .model import Model
from .schema import Schema

from .resource import Attendance
from .list_resource import AttendanceList

api.add_resource(Attendance, '/attendance/<int:id>')
api.add_resource(AttendanceList, '/attendance')
