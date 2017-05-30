#! /usr/bin/env python3
from app import app
from argparse import ArgumentParser
parser = ArgumentParser()
parser.add_argument('--dev', action='store_true', help='Enables debug mode on the app')
args = parser.parse_args()
if args.dev:
    from db import db
    db.create_all()
    app.run(debug=True)
else:
    app.run()

