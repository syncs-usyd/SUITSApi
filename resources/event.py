from flask_restful import Resource

from models import EventModel
from schemas import event_schema

class Event(Resource):

	def get(self, id):
		e = EventModel.query.get_or_404(id)
		return event_schema.jsonify(e)
