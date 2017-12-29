from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api
from flask_socketio import SocketIO
from apispec import APISpec
from flask_apispec.extension import FlaskApiSpec

from settings import DB_USER, DB_PASS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://{}:{}@localhost:3306/api'.format(DB_USER, DB_PASS)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config.update({
    'APISPEC_SPEC': APISpec(
        title='SUITS API',
        version='v2',
        plugins=['apispec.ext.marshmallow'],
        info = {
            'description': """SUITS API for memberships, events and attendance. All changes to the data can be observed via
            Socket.IO which can be procured if you have the API key."""
        }
    ),
    'APISPEC_SWAGGER_URL': '/docs.json',
    'APISPEC_SWAGGER_UI_URL': None
})

docs = FlaskApiSpec(app)

db = SQLAlchemy(app)

ma = Marshmallow(app)

api = Api(app)

socketio = SocketIO(app)

import member, event, attendance, auth
