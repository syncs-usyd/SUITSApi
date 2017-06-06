from flask_restful import Resource

from app import db
from . import Model, Schema

class Attendance(Resource):

    def get(self, id):
        att = AttendanceModel.query.get_or_404(id)
        schema = AttendanceSchema()
        return schema.jsonify(att)

    def delete(self, id):
        att = AttendanceModel.query.get_or_404(id)
        db.session.delete(att)



