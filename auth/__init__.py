from app import api, docs

from .resource import Token
from .util import auth_required

from .socket import *

api.add_resource(Token, '/token')

docs.register(Token)