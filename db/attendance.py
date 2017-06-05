from . import db

class AttendanceModel(db.Model):
    __tablename__ = "Attendance"

    id = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.Integer, db.ForeignKey("Member.id", ondelete="CASCADE"))
    event_id = db.Column(db.Integer, db.ForeignKey("Event.id", ondelete="CASCADE"))

    primary = db.Column(db.Boolean, default=False)
    secondary = db.Column(db.Boolean, default=False)

    additional = db.Column(db.String(256))

    member = db.relationship('MemberModel', back_populates='events_attended')
    event = db.relationship('EventModel', back_populates='members_attended')

