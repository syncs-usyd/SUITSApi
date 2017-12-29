from auth import auth_required

from flask_apispec import use_kwargs, marshal_with, doc
from flask_apispec.views import MethodResource

from app import db
from . import Model, Schema

@doc(tags=['Events'])
class EventList(MethodResource):

    @doc(
        summary="Retrieve all events",
        description="""Retrieves all events in the system.
        Does not retrieve the members attending those events."""
    )
    @auth_required
    @marshal_with(Schema(many=True, exclude=('members_attended',)))
    def get(self):
        return Model.query.all()

    @doc(
        summary="Add a new event",
        description="Adds a new event to the system."
    )
    @auth_required
    @use_kwargs(Schema)
    @marshal_with(Schema(only=('id', 'ref')))
    def post(self, **event_data):

        new_event = Model(**event_data)
        db.session.add(new_event)
        db.session.commit()

        return new_event
