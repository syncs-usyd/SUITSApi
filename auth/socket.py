from app import socketio
from flask import request
from .exceptions import AuthHeaderNoBearerException, BadTokenException
from jwt import decode
from settings import JWT_SECRET

@socketio.on('connect')
def auth_connection():
    auth_header = request.headers['Authorization']
    components = auth_header.split()
    if components[0] != 'Bearer':
        raise AuthHeaderNoBearerException
    try:
        decode(components[1], JWT_SECRET, algorithm='HS256')
    except:
        raise BadTokenException

