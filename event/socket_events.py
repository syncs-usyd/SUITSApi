from app import socketio
from sqlalchemy import event
from .model import Model
from .schema import Schema

@event.listens_for(Model, 'after_insert')
def send_event_insert(mapper, connection, target):
    schema = Schema(strict=False)
    data, err = schema.dump(target)

    socketio.send({
        "resource": "Event",
        "action": "INSERT",
        "data": data
    })

@event.listens_for(Model, 'after_update')
def send_event_update(mapper, connection, target):
    schema = Schema(strict=False)
    data, err = schema.dump(target)

    socketio.send({
        "resource": "Event",
        "action": "UPDATE",
        "data": data
    })

@event.listens_for(Model, 'after_delete')
def send_event_delete(mapper, connection, target):
    schema = Schema(strict=False)
    data, err = schema.dump(target)

    socketio.send({
        "resource": "Event",
        "action": "DELETE",
        "data": data
    })

