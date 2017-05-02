#! /usr/bin/env python3
from app import app, api, db
from models import *
from resources import *

# TEST CODE
db.drop_all()
db.create_all()
m = MemberModel(first_name='kosta', last_name='dunn', email='kosta@suits.org.au', access=1505212, sid=450303038, newsletter=True, doing_it=True, registered=True)
e = EventModel(title="test-event", description="best event ever m8")
db.session.add(m)
db.session.add(e)

db.session.commit()
att = AttendanceModel(member_id=m.id, event_id=e.id, primary=True)

db.session.add(att)
db.session.commit()
# END TEST CODE

api.add_resource(Token, '/token')
api.add_resource(Member, '/members/<int:id>')
api.add_resource(Event, '/events/<int:id>')

app.run(debug=True)
