from app import api, docs

from .model import Model
from .schema import Schema

from .resource import Attendance
from .list_resource import AttendanceList
from .socket_events import *

api.add_resource(Attendance, '/attendance/<int:id>')
api.add_resource(AttendanceList, '/attendance')

docs.register(Attendance)
docs.register(AttendanceList)