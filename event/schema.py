from app import ma

class Schema(ma.Schema):

    class Meta:
        strict = True

    id = ma.Int(dump_only=True)

    title = ma.Str()
    description = ma.Str()
    time = ma.DateTime()

    members_attended = ma.Nested('attendance.Schema', many=True, exclude=('events_attended','event'), dump_only=True, dump_to="membersAttended")

    ref = ma.URLFor('event', id='<id>')
