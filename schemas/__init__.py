from flask_marshmallow import Marshmallow

from app import get_app
ma = Marshmallow(get_app)

from .member import MemberSchema
from .event import EventSchema
from .attendance import AttendanceSchema
