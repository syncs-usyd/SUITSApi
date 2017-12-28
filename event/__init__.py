from app import api, docs

from .model import Model
from .schema import Schema

from .resource import Event
from .list_resource import EventList
from .socket_events import *

api.add_resource(Event, '/events/<int:id>')
api.add_resource(EventList, '/events')

docs.register(Event)
docs.register(EventList)
