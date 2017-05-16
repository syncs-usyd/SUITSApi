from flask_sqlalchemy import SQLAlchemy

from app import get_app

db = SQLAlchemy(get_app())
print(id(get_app()))

from .member import MemberModel
from .event import EventModel
from .attendance import AttendanceModel
