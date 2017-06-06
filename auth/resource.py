from flask_restful import Resource
from flask import request
from settings import JWT_SECRET, SUITS_PASS

import jwt
import json
import hmac

from .exceptions import IncorrectLoginException

class Token(Resource):
    def post(self):
        credentials = json.loads(request.data)
        if credentials['user'] == "suits" and hmac.compare_digest(credentials['pass'], SUITS_PASS):
            return {"token": jwt.encode({"user":"suits"}, JWT_SECRET, algorithm="HS256").decode()}
        else:
            raise IncorrectLoginException
