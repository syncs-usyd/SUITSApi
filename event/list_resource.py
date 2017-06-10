from flask_restful import Resource
from webargs.flaskparser import use_args
from auth import auth_required

from app import db
from . import Model, Schema

class EventList(Resource):

    @auth_required
    def get(self):
        events = Model.query.all()

        schema = Schema(many=True, exclude=('members_attended',))
        return schema.jsonify(events)

    @auth_required
    @use_args(Schema)
    def post(self, event_data):

        new_event = Model(**event_data)
        db.session.add(new_event)
        db.session.commit()

        schema = Schema(only=('id', 'ref'))
        return schema.jsonify(new_event)
