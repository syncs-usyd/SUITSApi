from flask_restful import Resource, request
from settings import JWT_USER, JWT_SECRET, JWT_PASS
from webargs.flaskparser import use_args

import jwt
import json
import hmac

from .exceptions import IncorrectLoginException
from .login_schema import LoginSchema

class Token(Resource):

    @use_args(LoginSchema)
    def post(self, credentials):

        if credentials['user'] == JWT_USER and hmac.compare_digest(credentials['pass_'], JWT_PASS):
            return {"token": jwt.encode({"user":JWT_USER}, JWT_SECRET, algorithm="HS256").decode()}
        else:
            raise IncorrectLoginException
