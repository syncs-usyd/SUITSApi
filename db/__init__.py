from flask_sqlalchemy import SQLAlchemy

from app import app

db = SQLAlchemy(app)

from .member import MemberModel
from .event import EventModel
from .attendance import AttendanceModel
