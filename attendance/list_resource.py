from flask_restful import Resource
from webargs.flaskparser import use_args

from . import Model, Schema
class AttendanceList(Resource):

    def get(self):

        query = Model.query

        if request.args.get('member'):
            query = query.filter(Model.member_id == request.args['member'])

        if request.args.get('event'):
            query = query.filter(Model.event_id == request.args['event'])


        results = query.all()
        if len(results) == 0:
            raise NotFoundException

        schema = Schema(many=True)

        return schema.jsonify(results)

    @use_args(Schema)
    def post(self, att_data):

        q = Model.query.filter(Model.member_id == request.args['member'], Model.event_id == request.args['event'])

        att = None
        # record exists
        if q.count() == 1:
            raise AttendanceExistsError

        att = Model()

        att.member_id = request.args['member']
        att.event_id = request.args['event']
        for field in att_data:
            setattr(att, field, att_data[field])

        db.session.add(att)

        try:
            db.session.commit()
        except exc.IntegrityError:
            raise MemberOrEventMissing

        schema = Schema()
        return schema.jsonify(att)

