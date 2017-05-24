from . import ma

class AttendanceSchema(ma.Schema):

    class Meta:
        strict = True

    id = ma.Int(dump_only=True)

    primary = ma.Bool()
    secondary = ma.Bool()
    additional = ma.Str()

    member = ma.Nested('MemberRefSchema', dump_only=True)
    event = ma.Nested('EventRefSchema', dump_only=True)

