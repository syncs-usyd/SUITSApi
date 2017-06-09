from flask_restful import Resource
from auth import auth_required

from app import db
from . import Model, Schema

class Attendance(Resource):

    @auth_required
    def get(self, id):
        att = Model.query.get_or_404(id)
        schema = Schema()
        return schema.jsonify(att)

    @auth_required
    def delete(self, id):
        att = Model.query.get_or_404(id)
        db.session.delete(att)



