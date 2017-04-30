from datetime import date
from app import db

class MemberModel(db.Model):
	__tablename__ = 'Member'

	id = db.Column(db.Integer, primary_key=True)

	email = db.Column(db.String)
	first_name = db.Column(db.String, nullable=False)
	last_name = db.Column(db.String, nullable=False)
	gender = db.Column(db.String)

	joined_on = db.Column(db.Date, default=date.today) #passing function so the value of `today` is the time when a new row is added.

	access = db.Column(db.Integer, unique=True) # TODO: Validate access numbers
	sid = db.Column(db.Integer, unique=True)

	newsletter = db.Column(db.Boolean, default=True)
	doing_it = db.Column(db.Boolean, default=False)
	registered = db.Column(db.Boolean, default=False)

	events_attended = db.relationship('AttendanceModel', back_populates='member')

	@db.validates('email')
	def validate_email(self, key, email):
		assert '@' in email
		return email

	@db.validates('sid')
	def validate_sid(self, key, sid):
		str_sid = str(sid)
		assert len(str_sid) == 9
		return sid
