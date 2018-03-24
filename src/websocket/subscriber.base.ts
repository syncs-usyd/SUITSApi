import { 
    InsertEvent,
    UpdateEvent,
    RemoveEvent, 
    EntitySubscriberInterface} from 'typeorm'
import * as SocketIO from 'socket.io'

import { BaseResource } from 'utils/resource.base';

import { Action } from './Action';
import { serialize } from 'utils/serialize';
import { ClassType } from 'class-transformer/ClassTransformer';
import { BaseEntity } from 'utils/entity.base';

export abstract class BaseSubscriber<E extends BaseEntity, R extends BaseResource> implements EntitySubscriberInterface {
    private static websocket: SocketIO.Server;

    static setWebsocket(websocket: SocketIO.Server) {
        BaseSubscriber.websocket = websocket;
    }

    abstract serialize(data: E): R

    abstract getFullItem(id: number): Promise<E>

    async send(action: Action, data: E)
    {
        let resource = await this.serialize(data);
        BaseSubscriber.websocket.send({
            resource: resource.getResourceName(),
            action: action,
            data: resource
        });
    }

    async afterInsert(entity: InsertEvent<E>) {
        let data = await this.getFullItem(entity.entity.id)
        this.send(Action.Insert, data);
    }

    afterUpdate(entity: UpdateEvent<E>) {
        this.send(Action.Update, entity.entity)
    }

    beforeRemove(entity: RemoveEvent<E>) {
        this.send(Action.Delete, entity.entity)
    }

}