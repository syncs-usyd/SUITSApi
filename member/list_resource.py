from auth import auth_required

from flask import request
from flask_apispec import use_kwargs, marshal_with, doc
from flask_apispec.views import MethodResource

from .model import Model
from .schema import Schema
from app import db

@doc(tags=['Members'])
class MemberList(MethodResource):

    @doc(
        summary="Retrieve all members",
        description="""Retrieves all members (registered or not) from the system.
        Does not retrieve the events they attended."""
    )
    @auth_required
    @marshal_with(Schema(many=True, exclude=('events_attended',)))
    def get(self):
        return Model.query.all()


    @doc(
        summary="Add a new member",
        description="""Adds a new member to the system.
        This endpoit tries to match the new data to an existing member.
        If a match is found, the existing member data is updated instead."""
    )
    @use_kwargs(Schema)
    @marshal_with(Schema(only=('id', 'ref')))
    def post(self, **memb_data):

        existing_member = None
        filterable_fields = [f for f in ['sid','access','email'] if f in memb_data]  # only filter by fields which were provided in POST data

        if len(filterable_fields) > 0:
            # only attempt to filter if there is at least one field to filter by
            filter_args = [getattr(Model, f) == memb_data[f] for f in filterable_fields]
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
        return memb

