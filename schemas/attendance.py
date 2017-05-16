from app import ma

class MemberAttendanceSchema(ma.ModelSchema):
	class Meta:
		fields = ('id', 'primary', 'secondary', 'additional', 'event')

	event = ma.URLFor('event', id='<event.id>')

class EventAttendanceSchema(ma.ModelSchema):
	class Meta:
		fields = ('id', 'primary', 'secondary', 'additional', 'member')

	member = ma.URLFor('member', id='<member.id>')

class AttendanceSchema(ma.ModelSchema):
	class Meta:
		fields = ('id', 'primary', 'secondary', 'additional', 'member', 'event')

	member = ma.URLFor('member', id='<member.id>')
	event = ma.URLFor('event', id='<event.id>')
