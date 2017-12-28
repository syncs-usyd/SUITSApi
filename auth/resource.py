from flask_restful import Resource, request
from settings import JWT_USER, JWT_SECRET, JWT_PASS

from flask_apispec import use_kwargs, marshal_with, doc
from flask_apispec.views import MethodResource

import jwt
import json
import hmac

from .exceptions import IncorrectLoginException
from .login_schema import LoginSchema

@doc(tags=['authentication'])
class Token(MethodResource):

    @doc(
        summary="Get API authentication token",
        description="""Returns a JWT to be used in subsequent requests
        on the API. Need to provide valid login credentials."""
    )
    @use_kwargs(LoginSchema)
    def post(self, **credentials):

        if credentials['user'] == JWT_USER and hmac.compare_digest(credentials['pass_'], JWT_PASS):
            return {"token": jwt.encode({"user":JWT_USER}, JWT_SECRET, algorithm="HS256").decode()}
        else:
            raise IncorrectLoginException
