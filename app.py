#!/usr/bin/env python3
from flask import Flask

def get_app():
    a = ApiApp._app
    if not a:
        print("NEW")
        a = Flask(__name__)
        a.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
        a.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        ApiApp._app = a
    return a


# legit hackery - signleton-esque thing :P
class ApiApp:
    _app = None

