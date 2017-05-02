from app import ma

class MemberAttendanceSchema(ma.ModelSchema):
	class Meta:
		fields = ('primary', 'secondary', 'additional', 'event')

	event = ma.URLFor('event', id='<event.id>')

class EventAttendanceSchema(ma.ModelSchema):
	class Meta:
		fields = ('primary', 'secondary', 'additional', 'member')

	member = ma.URLFor('member', id='<member.id>')
