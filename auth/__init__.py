from app import api

from .resource import Token

api.add_resource(Token, '/token')
