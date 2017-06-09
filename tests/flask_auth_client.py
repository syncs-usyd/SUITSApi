from settings import JWT_USER, JWT_PASS
from app import app
import json

class FlaskAuthClient:

    def __init__(self, app, token):
        self.app = app
        self.token = token

    def __call__(self, environ, start_response):
        environ['HTTP_AUTHORIZATION'] = 'Bearer {}'.format(self.token)
        return self.app(environ, start_response)
