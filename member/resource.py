from auth import auth_required

from flask_apispec import marshal_with, doc
from flask_apispec.views import MethodResource

from .model import Model
from .schema import Schema

@doc(tags=['Members'])
class Member(MethodResource):

    @doc(
        summary="Retrieve a particular member",
        description="""Retrieves a member with a given ID.
        Unlike its list counterpart, this endpoint will also 
        return references to all events attended by this member."""
    )
    @auth_required
    @marshal_with(Schema)
    def get(self, id):
        return Model.query.get_or_404(id)



