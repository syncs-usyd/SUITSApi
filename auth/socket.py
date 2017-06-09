from app import socketio
from flask import request
from jwt import decode
from settings import JWT_SECRET

from .exceptions import AuthHeaderNoBearerException, BadTokenException
from . import auth_required

@socketio.on('connect')
@auth_required
def auth_connection():
    pass # just need something to call on connect
