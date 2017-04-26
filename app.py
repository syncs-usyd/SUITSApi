#!/usr/bin/env python3
from flask import Flask
from flask_restful import Resource, Api
from resources import *

app = Flask(__name__)
api = Api(app)

api.add_resource(Token, '/token')

if __name__ == "__main__":
	app.run(debug=True)
