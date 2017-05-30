from flask_restful import Resource, request
from webargs.flaskparser import use_args

from . import api
from db import db, AttendanceModel
from schemas import AttendanceSchema
from exceptions import NotFoundException

@api.route('/attendance/<int:id>')
class Attendance(Resource):

    def get(self, id):
        att = AttendanceModel.query.get_or_404(id)
        schema = AttendanceSchema()
        return schema.jsonify(att)

@api.route('/attendance')
class AttendanceList(Resource):

    def get(self):

        query = AttendanceModel.query

        if request.args.get('member'):
            query = query.filter(AttendanceModel.member_id == request.args['member'])

        if request.args.get('event'):
            query = query.filter(AttendanceModel.event_id == request.args['event'])


        results = query.all()
        if len(results) == 0:
            raise NotFoundException

        schema = AttendanceSchema(many=True)

        return schema.jsonify(results)

    @use_args(AttendanceSchema)
    def post(self, att_data):

        q = AttendanceModel.query.filter(AttendanceModel.member_id == request.args['member'], AttendanceModel.event_id == request.args['event'])

        att = None
        # record exists
        if q.count() == 1:
            raise AttendanceExistsError

        att = AttendanceModel()

        att.member_id = request.args['member']
        att.event_id = request.args['event']
        for field in att_data:
            setattr(att, field, att_data[field])

        db.session.add(att)
        db.session.commit()

        schema = AttendanceSchema()
        return schema.jsonify(att)








