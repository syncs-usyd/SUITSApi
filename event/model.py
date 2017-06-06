from datetime import datetime

from app import db

class Model(db.Model):
    __tablename__ = "Event"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    description = db.Column(db.String(128))
    time = db.Column(db.DateTime, default=datetime.utcnow)

    members_attended = db.relationship('attendance.Model', back_populates='event', cascade="all, delete")
