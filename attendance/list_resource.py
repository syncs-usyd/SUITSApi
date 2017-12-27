from flask_restful import Resource, request
from webargs.flaskparser import use_args
from sqlalchemy import exc

from app import db
from auth import auth_required

from . import Model, Schema
from .exceptions import MemberMissingException, EventMissingException, NotFoundException, AttendanceExistsException

import member
import event

class AttendanceList(Resource):

    @auth_required
    def get(self):
        query = Model.query
        if request.args.get('member'):
            query = query.filter(Model.member_id == request.args['member'])
        if request.args.get('event'):
            query = query.filter(Model.event_id == request.args['event'])

        results = query.all()

        schema = Schema(many=True)
        return schema.jsonify(results)


    @auth_required
    @use_args(Schema)
    def post(self, att_data):

        q = Model.query.filter(Model.member_id == request.args['member'], Model.event_id == request.args['event'])

        att = None

        # sanity checks
        if q.count() == 1:
            raise AttendanceExistsException()
        if not member.Model.query.get(request.args['member']):
            raise MemberMissingException()
        if not event.Model.query.get(request.args['event']):
            raise EventMissingException()

        att = Model()

        att.member_id = int(request.args['member'])
        att.event_id = int(request.args['event'])
        for field in att_data:
            setattr(att, field, att_data[field])

        db.session.add(att)
        db.session.commit()

        schema = Schema()
        return schema.jsonify(att)

