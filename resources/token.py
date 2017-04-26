from flask_restful import Resource
from flask import request
from settings import JWT_SECRET, SUITS_PASS
from exceptions import IncorrectLoginException

import jwt
import json

class Token(Resource):
	def post(self):
		credentials = json.loads(request.data)
		if credentials['user'] == "suits" and credentials['pass'] == SUITS_PASS:
			return {"token": jwt.encode({"user":"suits"}, JWT_SECRET, algorithm="HS256").decode()}
		else:
			raise IncorrectLoginException
