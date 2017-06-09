from flask_restful import Resource
from webargs.flaskparser import use_args
from auth import auth_required

from .model import Model
from .schema import Schema
from app import db

class MemberList(Resource):

    @auth_required
    def get(self):
        members = Model.query.all()
        schema = Schema(many=True, exclude=('events_attended',))
        return schema.jsonify(members)


    @use_args(Schema)
    def post(self, memb_data):

        filterable_fields = ['sid','access','email']
        filter_args = [getattr(Model, f) == memb_data[f] for f in filterable_fields if memb_data.get(f)]

        existing_member = Model.query.filter(db.or_(*filter_args)).first()

        memb = None
        if existing_member:
            # update member
            memb = existing_member
            if 'registered' in memb_data:
                # If we're trying to change registration, you can't unregister
                memb_data['registered'] |= memb.registered
        else:
            # create member
            new_member = Model()
            db.session.add(new_member)
            memb = new_member

        for field in memb_data:
            setattr(memb, field, memb_data[field])

        db.session.commit()
        schema = Schema(exclude=('events_attended',))
        data = schema.dump(memb)

        return data

