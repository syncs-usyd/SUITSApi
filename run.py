#! /usr/bin/env python3
from app import app, api
from resources import *
# TEST CODE

from models import *
from app import db
app.config['SQLALCHEMY_ECHO'] = True

db.drop_all()
db.create_all()
m = MemberModel(first_name='kosta', last_name='dunn', email='kosta@suits.org.au', access=1505212, sid=450303038, newsletter=True, doing_it=True, registered=True)
e = EventModel(title="test-event", description="best event ever m8")
e2 = EventModel(title="test-event2", description="best event ever m8")
db.session.add(m)
db.session.add(e)
db.session.add(e2)

db.session.commit()
att = AttendanceModel(member_id=m.id, event_id=e.id, primary=True)
att2 = AttendanceModel(member_id=m.id, event_id=e2.id, primary=True)

db.session.add(att)
db.session.add(att2)
db.session.commit()

db.session.delete(e2)
db.session.commit()

# END TEST CODE

api.add_resource(Token, '/token')
api.add_resource(Member, '/members/<int:id>')
api.add_resource(Event, '/events/<int:id>')
api.add_resource(MemberList, '/members')
api.add_resource(EventList, '/events')

app.run(debug=True)
