from flask_restful import Resource

from models import EventModel
from schemas import EventSchema

class Event(Resource):

	def get(self, id):
		e = EventModel.query.get_or_404(id)
		schema = EventSchema()
		return schema.jsonify(e)
