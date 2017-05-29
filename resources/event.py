from flask_restful import Resource
from webargs import fields
from webargs.flaskparser import use_args

from . import api
from db import db, EventModel
from schemas import EventSchema

@api.route('/events/<int:id>')
class Event(Resource):

    def get(self, id):
        e = EventModel.query.get_or_404(id)

        schema = EventSchema()
        return schema.jsonify(e)

    @use_args(EventSchema)
    def put(self, event_data, id):
        e = EventModel.query.get_or_404(id)

        for field in event_data:
            setattr(e, field, event_data[field])

        db.session.commit()

        schema = EventSchema(exclude=('members_attended',))
        return schema.jsonify(e)

    def delete(self, id):
        e = EventModel.query.get_or_404(id)

        db.session.delete(e)
        db.session.commit()


@api.route('/events')
class EventList(Resource):

    def get(self):
        events = EventModel.query.all()

        schema = EventSchema(many=True, exclude=('members_attended',))
        return schema.jsonify(events)

    @use_args(EventSchema)
    def post(self, event_data):

        new_event = EventModel(**event_data)
        db.session.add(new_event)
        db.session.commit()

        schema = EventSchema(exclude=('members_attended',))
        return schema.jsonify(new_event)
