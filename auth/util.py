from jwt import decode
from jwt.exceptions import InvalidTokenError
from .exceptions import AuthHeaderNoBearerException, BadTokenException, NoAuthHeaderException
from flask import request
import functools
from app import app

from settings import JWT_SECRET

def checkToken(token):
        try:
            decode(token, JWT_SECRET, algorithm='HS256')
            return True
        except InvalidTokenError:
            return False

def auth_required(f):

    @functools.wraps(f)
    def decorator(*args, **kwargs):
        token = request.args.get('token')
        if not token:
            auth_header = request.headers.get('Authorization')
            if not auth_header:
                raise NoAuthHeaderException()

            components = auth_header.split()
            if components[0] != 'Bearer':
                raise AuthHeaderNoBearerException()

            token = components[1]
            
        if not checkToken(token):
            raise BadTokenException()


        return f(*args, **kwargs)

    return decorator

