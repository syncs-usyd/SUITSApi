from flask_restful import Resource

from app import db
from . import Model, Schema

class Attendance(Resource):

    def get(self, id):
        att = Model.query.get_or_404(id)
        schema = Schema()
        return schema.jsonify(att)

    def delete(self, id):
        att = Model.query.get_or_404(id)
        db.session.delete(att)



