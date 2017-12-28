from flask_restful import Resource, request

from app import db
from auth import auth_required

from flask_apispec import use_kwargs, marshal_with, doc
from flask_apispec.views import MethodResource

from . import Model, Schema
from .exceptions import MemberMissingException, EventMissingException, NotFoundException, AttendanceExistsException

import member
import event

@doc(tags=['attendance'])
class AttendanceList(MethodResource):

    @doc(
        summary="Get all attendance",
        description="""Retrieves all attendance.
        Can be filtered by member and event IDs in the query string.
        The request will fail if a record for a given member and event
        already exists. 
        If you want to change an existing attendace record, use the PUT endpoint."""
    )
    @marshal_with(Schema(many=True))
    @auth_required
    def get(self):
        query = Model.query
        if request.args.get('member'):
            query = query.filter(Model.member_id == request.args['member'])
        if request.args.get('event'):
            query = query.filter(Model.event_id == request.args['event'])

        return query.all()



    @doc(
        summary="Add a new attendance record",
        description="""Adds a new record of attendance for a given member at a given event.
        Both an event ID and a member ID must be present in the query string when making this request."""
    )
    @auth_required
    @use_kwargs(Schema)
    @marshal_with(Schema)
    def post(self, **att_data):

        if not member.Model.query.get(request.args['member']):
            raise MemberMissingException()
        if not event.Model.query.get(request.args['event']):
            raise EventMissingException()

        q = Model.query.filter(Model.member_id == request.args['member'], Model.event_id == request.args['event'])

        att = None

        # sanity checks
        if q.count() == 1:
            raise AttendanceExistsException()

        att = Model()

        att.member_id = int(request.args['member'])
        att.event_id = int(request.args['event'])
        for field in att_data:
            setattr(att, field, att_data[field])

        db.session.add(att)
        db.session.commit()

        return att
