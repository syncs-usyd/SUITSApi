from app import ma

class Schema(ma.Schema):

    class Meta:
        strict = True

    id = ma.Int(dump_only=True)

    first_name = ma.Str(dump_to="firstName")
    last_name = ma.Str(dump_to="lastName")
    gender = ma.Str()

    email = ma.Str()

    joined_on = ma.Date(dump_only=True, dump_to="joinedOn")

    access = ma.Int()
    sid = ma.Int()

    newsletter = ma.Bool()
    doing_it = ma.Bool(dump_to="doingIT")
    registered = ma.Bool()

    events_attended = ma.Nested('AttendanceSchema', many=True, exclude=('members_attended', 'member'), dump_only=True, dump_to="eventsAttended")

    ref = ma.URLFor('member', id='<id>')
