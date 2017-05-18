from flask_marshmallow import Marshmallow

from app import app
ma = Marshmallow(app)

from .member import MemberSchema
from .event import EventSchema
from .attendance import AttendanceSchema
