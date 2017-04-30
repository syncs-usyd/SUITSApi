from app import ma

class EventSchema(ma.ModelSchema):
	class Meta:
		fields = ('id', 'title', 'description', 'time', 'members_attended')
	
	members_attended = ma.Nested('MemberSchema', many=True, exclude=('events_attended',))
