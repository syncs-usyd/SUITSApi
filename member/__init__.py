from app import api

from .model import Model
from .schema import Schema

from .resource import Member
from .list_resource import MemberList

api.add_resource(Member, '/members/<int:id>')
api.add_resource(MemberList, '/members')
