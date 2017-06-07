from app import api

from .resource import Member
from .list_resource import MemberList
from .socket_events import *

api.add_resource(Member, '/members/<int:id>')
api.add_resource(MemberList, '/members')
