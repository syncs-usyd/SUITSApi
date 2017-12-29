from auth import auth_required

from flask_apispec import use_kwargs, marshal_with, doc
from flask_apispec.views import MethodResource

from app import db
from . import Model, Schema

@doc(tags=['Events'])
class Event(MethodResource):

    @doc(
        summary="Retrieve an event",
        description="""Retrieves an event with a given ID.
        Also returns the references to members who attended the event."""
    )
    @auth_required
    @marshal_with(Schema)
    def get(self, id):
        return Model.query.get_or_404(id)

    @doc(
        summary="Modify an event",
        description="""Modifies an event with a given ID with the data in the request body."""
    )
    @auth_required
    @use_kwargs(Schema)
    @marshal_with(Schema(exclude=('events_attended',)))
    def put(self, id, **event_data):
        e = Model.query.get_or_404(id)

        for field in event_data:
            setattr(e, field, event_data[field])

        db.session.commit()
        return e

    @doc(
        summary="Delete an event",
        description="""Deletes an event with a given ID.
        Also deletes all attendance records for this event."""
    )
    @auth_required
    def delete(self, id):
        e = Model.query.get_or_404(id)

        db.session.delete(e)
        db.session.commit()

