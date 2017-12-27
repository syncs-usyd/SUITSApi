from app import socketio
from sqlalchemy import event
from .model import Model
from .schema import Schema

@event.listens_for(Model, 'after_insert')
def send_attendance_insert(mapper, connection, target):
    # WORKAROUND. SQLAlchemy doesn't populate member and event relatinoships here :/
    target = Model.query.get(target.id)

    schema = Schema(strict=False)
    data, err = schema.dump(target)

    socketio.send({
        "resource": "Attendance",
        "action": "INSERT",
        "data": data
    })

@event.listens_for(Model, 'after_update')
def send_attendance_update(mapper, connection, target):
    schema = Schema(strict=False)
    data, err = schema.dump(target)

    socketio.send({
        "resource": "Attendance",
        "action": "UPDATE",
        "data": data
    })

@event.listens_for(Model, 'after_delete')
def send_attendance_delete(mapper, connection, target):
    print("DELETIG M80")
    schema = Schema(strict=False)
    data, err = schema.dump(target)

    socketio.send({
        "resource": "Attendance",
        "action": "DELETE",
        "data": data
    })

