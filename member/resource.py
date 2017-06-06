from flask_restful import Resource
from webargs.flaskparser import use_args

from . import Model, Schema

class Member(Resource):

    def get(self, id):
        m = Model.query.get_or_404(id)
        schema = Schema()
        return schema.jsonify(m)



