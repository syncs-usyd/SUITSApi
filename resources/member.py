from flask_restful import Resource

from models import MemberModel
from schemas import member_schema

class Member(Resource):
	def get(self, id):
		m = MemberModel.query.get_or_404(id)
		print(m)
		print(m.id, m.first_name)
		print(m.events_attended[0].event)
		return member_schema.jsonify(m)
