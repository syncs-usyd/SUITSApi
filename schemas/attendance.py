from . import ma

class AttendanceSchema(ma.ModelSchema):
    class Meta:
        fields = ('id', 'primary', 'secondary', 'additional', 'member', 'event')

    member = ma.Nested('MemberRefSchema')
    event = ma.Nested('EventRefSchema')

