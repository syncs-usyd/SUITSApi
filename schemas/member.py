from app import ma

class MemberSchema(ma.ModelSchema):
    class Meta:
        fields = ('id', 'first_name', 'last_name', 'gender', 'email', 'joined_on', 'access', 'sid', 'newsletter', 'doing_it', 'registered', 'events_attended')

    events_attended = ma.Nested('AttendanceSchema', many=True, exclude=('members_attended', 'member'))
