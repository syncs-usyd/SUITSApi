from auth import auth_required
from app import db

from flask_apispec import marshal_with, doc, use_kwargs
from flask_apispec.views import MethodResource

from .model import Model
from .schema import Schema

@doc(tags=['Members'])
class Member(MethodResource):

    @doc(
        summary="Retrieve a member",
        description="""Retrieves a member with a given ID.
        Unlike its list counterpart, this endpoint will also 
        return references to all events attended by this member."""
    )
    @auth_required
    @marshal_with(Schema)
    def get(self, id):
        return Model.query.get_or_404(id)

    @doc(
        summary="Update member data",
        description="Updates the data of a member with the given ID"
    )
    @auth_required
    @use_kwargs(Schema)
    @marshal_with(Schema)
    def put(self, id, **member_data):
        member = Model.query.get_or_404(id)

        for field in member_data:
            setattr(member, field, member_data[field])

        db.session.commit()
        return member

    @doc(
        summary="Delete a member",
        description="Delete a member with a given ID"
    )
    @auth_required
    def delete(self, id):
        e = Model.query.get_or_404(id)

        db.session.delete(e)
        db.session.commit()



