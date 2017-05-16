from flask_restful import Resource, reqparse
from flask import request
from app import db

from schemas import AttendanceSchema
from models import AttendanceModel
from exceptions import NotFoundException

class AttendanceList(Resource):

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('member', type=int, location='args')
        parser.add_argument('event', type=int, location='args')
        args = parser.parse_args()

        query = AttendanceModel.query

        if args['member']:
            query = query.filter(AttendanceModel.member_id == args['member'])

        if args['event']:
            query = query.filter(AttendanceModel.event_id == args['event'])

        results = query.all()
        if len(results) == 0:
            raise NotFoundException

        schema = AttendanceSchema(many=True)

        return schema.jsonify(results)

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('member', type=int, required=True, location='args')
        parser.add_argument('event', type=int, required=True, location='args')

        parser.add_argument('primary', type=bool, location='json', required=True)
        parser.add_argument('secondary', type=bool, location='json', required=True)
        parser.add_argument('additional', type=str, location='json')
        args = parser.parse_args()

        q = AttendanceModel.query.filter(AttendanceModel.member_id == args['member'], AttendanceModel.event_id == args['event'])

        att = None
        # record exists
        if q.count() == 1:
            raise AttendanceExistsError
        att = AttendanceModel()

        att.member_id = args['member']
        att.event_id = args['event']

        att.primary = args['primary']
        att.secondary = args['secondary']
        att.additional = args['additional']

        db.session.add(att)
        db.session.commit()

        schema = AttendanceSchema()
        return schema.jsonify(att)






