from settings import JWT_USER, JWT_SECRET, JWT_PASS

from flask_apispec import use_kwargs, doc
from flask_apispec.views import MethodResource

import jwt
import json
import hmac
from datetime import datetime, timedelta

from .exceptions import IncorrectLoginException
from .login_schema import LoginSchema

@doc(tags=['authentication'])
class Token(MethodResource):

    @doc(
        summary="Get an API authentication token",
        description="""Returns a JWT to be used in subsequent requests
        on the API. Need to provide valid login credentials."""
    )
    @use_kwargs(LoginSchema)
    def post(self, **credentials):

        if credentials['user'] == JWT_USER and hmac.compare_digest(credentials['password'], JWT_PASS):
            expTime = datetime.utcnow() + timedelta(hours=6)
            return {"token": jwt.encode({"user":JWT_USER, "exp":expTime}, JWT_SECRET, algorithm="HS256").decode()}
        else:
            raise IncorrectLoginException()
