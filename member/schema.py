from app import ma

class Schema(ma.Schema):

    class Meta:
        strict = True

    id = ma.Int(dump_only=True)

    first_name = ma.Str(dump_to="firstName", load_from="firstName", required=True)
    last_name = ma.Str(dump_to="lastName", load_from="lastName", required=True)
    gender = ma.Str()

    email = ma.Str()

    joined_on = ma.Date(dump_only=True, dump_to="joinedOn")

    access = ma.Int()
    sid = ma.Int()

    newsletter = ma.Bool()
    doing_it = ma.Bool(dump_to="doingIT", load_from="doingIT")
    registered = ma.Bool()

    events_attended = ma.Nested('attendance.schema.Schema', many=True, exclude=('members_attended', 'member'), dump_only=True, dump_to="eventsAttended")

    ref = ma.URLFor('member', id='<id>', dump_only=True)
