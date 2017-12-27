from flask_restful import Resource
from webargs.flaskparser import use_args
from auth import auth_required

from app import db
from . import Model, Schema

class Attendance(Resource):

    @auth_required
    def get(self, att_data, id):
        att = Model.query.get_or_404(id)
        schema = Schema()
        return schema.jsonify(att)

    @auth_required
    def delete(self, id):
        att = Model.query.get_or_404(id)
        db.session.delete(att)
        db.session.commit()

    @auth_required
    @use_args(Schema)
    def put(self, att_data, id):
        att = Model.query.get_or_404(id)

        for field in att_data:
            setattr(att, field, att_data[field])

        db.session.add(att)
        db.session.commit()

        schema = Schema()
        return schema.jsonify(att)




