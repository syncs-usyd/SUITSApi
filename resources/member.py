from flask_restful import Resource

from models import MemberModel
from schemas import member_schema

class Member(Resource):

	def get(self, id):
		m = MemberModel.query.get_or_404(id)
		return member_schema.jsonify(m)
