from app import ma

class Schema(ma.Schema):

    class Meta:
        strict = True

    id = ma.Int(dump_only=True)

    title = ma.Str(required=True)
    description = ma.Str()
    time = ma.DateTime(required=True)

    members_attended = ma.Nested('attendance.schema.Schema', many=True, exclude=('events_attended','event'), dump_only=True, dump_to="membersAttended")

    ref = ma.URLFor('event', id='<id>', dump_only=True)
