import { 
    EventSubscriber,
    InsertEvent,
    UpdateEvent,
    RemoveEvent, 
    EntitySubscriberInterface} from 'typeorm'
import * as SocketIO from 'socket.io'

import { BaseEntity } from 'utils/baseentity'

import { WebSocketUpdateMessage } from './WebSocketUpdateMessage';
import { Action } from './Action';

@EventSubscriber()
export class Subscriber<T extends BaseEntity> implements EntitySubscriberInterface {
    private static websocket: SocketIO.Server;

    static setWebsocket(websocket: SocketIO.Server) {
        Subscriber.websocket = websocket;
    }

    send(action: Action, data: T)
    {
        Subscriber.websocket.send(new WebSocketUpdateMessage(
            data.getTypeName(),
            action,
            data
        ));
    }

    afterInsert(entity: InsertEvent<T>) {
        this.send(Action.Insert, entity.entity)
    }

    afterUpdate(entity: UpdateEvent<T>) {
        this.send(Action.Update, entity.entity)
    }

    afterRemove(entity: RemoveEvent<T>) {
        this.send(Action.Delete, entity.entity)
    }

}