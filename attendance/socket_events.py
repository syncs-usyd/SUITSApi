from app import socketio
from sqlalchemy import event
from .model import Model
from .schema import Schema

@event.listens_for(Model, 'after_insert')
def send_member_insert(mapper, connection, target):
    schema = Schema(strict=False)
    data, err = schema.dumps(target)

    socketio.send({
        "resource": "Attendance",
        "action": "INSERT",
        "data": data
    })

@event.listens_for(Model, 'after_update')
def send_member_insert(mapper, connection, target):
    schema = Schema(strict=False)
    data, err = schema.load(target)

    socketio.send({
        "resource": "Attendance",
        "action": "UPDATE",
        "data": data
    })

@event.listens_for(Model, 'after_delete')
def send_member_insert(mapper, connection, target):
    schema = Schema(strict=False)
    data, err = schema.dumps(target)

    socketio.send({
        "resource": "Attendance",
        "action": "DELETE",
        "data": data
    })

