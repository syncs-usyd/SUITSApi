from flask_restful import Resource
from flask import request

import json

from app import db
from models import EventModel
from schemas import EventSchema

class Event(Resource):

	def get(self, id):
		e = EventModel.query.get_or_404(id)

		schema = EventSchema()
		return schema.jsonify(e)

	def patch(self, id):
		e = EventModel.query.get_or_404(id)

		web_data = json.loads(request.data)
		EventModel.query.filter(EventModel.id == id).update(web_data)
		db.session.commit()
		schema = EventSchema(exclude=('members_attended',))
		return schema.jsonify(e)

	def delete(self, id):
		e = EventModel.query.get_or_404(id)

		db.session.delete(e)
		db.session.commit()

class EventList(Resource):

	def get(self):
		events = EventModel.query.all()

		schema = EventSchema(many=True, exclude=('members_attended',))
		return schema.jsonify(events)

