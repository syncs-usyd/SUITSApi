from flask_restful import Resource
from webargs.flaskparser import use_args

from app import db
from . import Model, Schema

class EventList(Resource):

    def get(self):
        events = Model.query.all()

        schema = Schema(many=True, exclude=('members_attended',))
        return schema.jsonify(events)

    @use_args(Schema)
    def post(self, event_data):

        new_event = Model(**event_data)
        db.session.add(new_event)
        db.session.commit()

        schema = Schema(exclude=('members_attended',))
        return schema.jsonify(new_event)