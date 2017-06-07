from app import api

from .resource import Token
from .socket import *

api.add_resource(Token, '/token')
