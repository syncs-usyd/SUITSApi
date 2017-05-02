from app import db

class AttendanceData:
	
	def __init__(self, primary=False, secondary=False, additional=None):
		self.primary = primary
		self.secondary = secondary
		self.additional = additional

class AttendanceModel(db.Model):
	__tablename__ = "Attendance"


	member_id = db.Column(db.String, db.ForeignKey("Member.id"), primary_key=True)
	event_id = db.Column(db.Integer, db.ForeignKey("Event.id"), primary_key=True)

	primary = db.Column(db.Boolean, default=False)
	secondary = db.Column(db.Boolean, default=False)

	additional = db.Column(db.String)

	member = db.relationship('MemberModel', back_populates='events_attended')
	event = db.relationship('EventModel', back_populates='members_attended')
	data = db.composite(AttendanceData, primary=primary, secondary=secondary, additional=additional)

