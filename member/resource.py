from flask_restful import Resource
from webargs.flaskparser import use_args
from auth import auth_required

from .model import Model
from .schema import Schema

class Member(Resource):

    @auth_required
    def get(self, id):
        m = Model.query.get_or_404(id)
        schema = Schema()
        return schema.jsonify(m)



