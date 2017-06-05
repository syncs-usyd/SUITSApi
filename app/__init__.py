#!/usr/bin/env python3
from flask import Flask

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://localhost:3306/api'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# initiaizing the plugins for the app
import db
import schemas
import resources
