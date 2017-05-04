from flask_restful import Resource
from flask import request

from app import db
from models import MemberModel
from schemas import MemberSchema

import json

class Member(Resource):

	def get(self, id):
		m = MemberModel.query.get_or_404(id)
		schema = MemberSchema()
		return schema.jsonify(m)


class MemberList(Resource):

	def get(self):
		members = MemberModel.query.all()
		schema = MemberSchema(many=True, exclude=('events_attended',))
		return schema.jsonify(members)

	def post(self):
		memb_data = json.loads(request.data)

		filterable_fields = ['sid','access','email']
		
		filter_args = [getattr(MemberModel, f) == data[f] for f in filrerable_fields if memb_data.get(r)]

		existing_member = MemberModel.query.filter(db.or_(*filter_args)).first()

		if existing_member:
			# update member
			MemberModel.query.filter(MemberModel.id == existing_member.id).update(memb_data)
			db.session.commit()

		else:
			# create member
			new_member = MemberModel(**memb_data)
			db.session.add(new_member)
			db.session.commit()

