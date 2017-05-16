from app import get_app
from flask_restful import Api
import types

api = Api(get_app())

# routing decorator setup
def api_route(self, *args, **kwargs):
    def wrapper(cls):
        self.add_resource(cls, *args, **kwargs)
        return cls
    return wrapper

api.route = types.MethodType(api_route, api)

from .token import Token
from .member import Member, MemberList
from .event import Event, EventList
from .attendance import AttendanceList
