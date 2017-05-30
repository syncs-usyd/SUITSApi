from . import ma

class EventSchema(ma.Schema):

    class Meta:
        strict = True

    id = ma.Int(dump_only=True)

    title = ma.Str()
    description = ma.Str()
    time = ma.DateTime()

    members_attended = ma.Nested('AttendanceSchema', many=True, exclude=('events_attended','event'), dump_only=True)

    ref = ma.URLFor('event', id='<id>')
