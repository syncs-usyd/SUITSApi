from app import api

from .model import Model
from .schema import Schema

from .resource import Event
from .list_resource import EventList

api.add_resource(Event, '/events/<int:id>')
api.add_resource(EventList, '/events')
