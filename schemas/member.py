from . import ma

class MemberSchema(ma.Schema):

    class Meta:
        strict = True

    id = ma.Int(dump_only=True)

    first_name = ma.Str()
    last_name = ma.Str()
    gender = ma.Str()

    email = ma.Str()

    joined_on = ma.Date(dump_only=True)

    access = ma.Int()
    sid = ma.Int()

    newsletter = ma.Bool()
    doing_it = ma.Bool()
    registered = ma.Bool()

    events_attended = ma.Nested('AttendanceSchema', many=True, exclude=('members_attended', 'member'), dump_only=True)

    ref = ma.URLFor('member', id='<id>')
