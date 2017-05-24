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
    def put(self, id, event_data):
        e = EventModel.query.get_or_404(id)

        e.update(event_data)
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

    def post(self):
        web_data = json.loads(request.data)

        new_event = EventModel(**web_data)
        db.session.add(new_event)
        db.session.commit()

        schema = EventSchema(exclude=('members_attended',))
        return schema.jsonify(new_event)
