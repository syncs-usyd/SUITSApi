from app import ma

class AttendanceSchema(ma.ModelSchema):
    class Meta:
        fields = ('id', 'primary', 'secondary', 'additional', 'member', 'event')

    member = ma.URLFor('member', id='<member.id>')
    event = ma.URLFor('event', id='<event.id>')
