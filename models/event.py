from datetime import datetime

from app import db

class EventModel(db.Model):
	__tablename__ = "Event"

	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String, nullable=False)
	description = db.Column(db.String)
	time = db.Column(db.DateTime, default=datetime.utcnow)

	members_attended = db.relationship('AttendanceModel', back_populates='event')
