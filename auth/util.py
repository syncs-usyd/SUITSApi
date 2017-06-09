from jwt import decode
from jwt.exceptions import DecodeError
from .exceptions import AuthHeaderNoBearerException, BadTokenException, NoAuthHeaderException
from flask import request
import functools
from app import app

from settings import JWT_SECRET

def auth_required(f):
    @functools.wraps(f)
    def decorator(*args, **kwargs):
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            raise NoAuthHeaderException

        components = auth_header.split()
        if components[0] != 'Bearer':
            raise AuthHeaderNoBearerException

        try:
            decode(components[1], JWT_SECRET, algorithm='HS256')
        except DecodeError:
            raise BadTokenException

        return f(*args, **kwargs)

    return decorator

