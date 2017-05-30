from . import ma

class AttendanceSchema(ma.Schema):

    class Meta:
        strict = True

    id = ma.Int(dump_only=True)

    primary = ma.Bool()
    secondary = ma.Bool()
    additional = ma.Str()

    member = ma.Nested('MemberSchema', only=('id', 'ref'), dump_only=True)

    event = ma.Nested('EventSchema', only=('id', 'ref'), dump_only=True)

    ref = ma.URLFor('attendance', id='<id>')
