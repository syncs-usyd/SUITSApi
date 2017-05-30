from flask_restful import Resource
from webargs.flaskparser import use_args

from . import api
from db import db, MemberModel
from schemas import MemberSchema

@api.route('/members/<int:id>')
class Member(Resource):

    def get(self, id):
        m = MemberModel.query.get_or_404(id)
        schema = MemberSchema()
        return schema.jsonify(m)


@api.route('/members')
class MemberList(Resource):

    def get(self):
        members = MemberModel.query.all()
        schema = MemberSchema(many=True, exclude=('events_attended',))
        return schema.jsonify(members)

    @use_args(MemberSchema)
    def post(self, memb_data):

        filterable_fields = ['sid','access','email']
        filter_args = [getattr(MemberModel, f) == memb_data[f] for f in filterable_fields if memb_data.get(f)]

        existing_member = MemberModel.query.filter(db.or_(*filter_args)).first()

        memb = None
        if existing_member:
            # update member
            memb = existing_member
            if 'registered' in memb_data:
                # If we're trying to change registration, you can't unregister
                memb_data['registered'] |= memb.registered
        else:
            # create member
            new_member = MemberModel()
            db.session.add(new_member)
            memb = new_member

        for field in memb_data:
            setattr(memb, field, memb_data[field])

        db.session.commit()

        schema = MemberSchema(exclude=('events_attended',))
        return schema.jsonify(memb)


