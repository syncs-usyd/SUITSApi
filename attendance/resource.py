from auth import auth_required

from flask_apispec import use_kwargs, marshal_with, doc
from flask_apispec.views import MethodResource

from app import db
from . import Model, Schema

@doc(tags=['Attendance'])
class Attendance(MethodResource):

    @doc(
        summary="Retrieve an attendance record.",
        description="""Retrieves an attendace record with a given ID.
        Also returns the references to the member and event for which
        this attendance record was made.
        This endpoint is functionally identical to its list counterpart 
        when used with both an event and member filters. 
        The difference is that the list endpoint will return a list of size
         1, while this will return just the record."""
    )
    @auth_required
    @marshal_with(Schema)
    def get(self, id):
        return Model.query.get_or_404(id)

    @doc(
        summary="Delete an attendance record",
        description="""Deletes an attendance record given the id of the record.
        Will not delete either the member of the event for which this record was made.
        """
    )
    @auth_required
    def delete(self, id):
        att = Model.query.get_or_404(id)
        db.session.delete(att)
        db.session.commit()

    @doc(
        summary="Modify an attendance record",
        description="""Modifies an attendance record with a given id with
        the data in the request body."""
    )
    @auth_required
    @use_kwargs(Schema)
    @marshal_with(Schema)
    def put(self, id, **att_data):
        att = Model.query.get_or_404(id)

        for field in att_data:
            setattr(att, field, att_data[field])

        db.session.add(att)
        db.session.commit()

        return att




