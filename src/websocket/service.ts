import { Component } from "@nestjs/common"
import * as SocketIO from 'socket.io'

import { BaseResource } from "resources/resource.base";

import { WebSocketGateway } from './gateway'
import { Action } from "./action";
import { SerializerService } from "serializer/service";
import { ClassType } from "class-transformer/ClassTransformer";
import { BaseEntity } from "entities/entity.base";

@Component()
export class WebSocketService {

    constructor(
        private readonly serializer: SerializerService, 
        private readonly gateway: WebSocketGateway) {}

    getSocket(): SocketIO.Server {
        return this.gateway.server
    }

    private send<E extends BaseEntity, R extends BaseResource>(entity: E, type: ClassType<R>, action: Action) {
        let resource = this.serializer.getResource(entity,type)
        this.getSocket().send({
            resource: resource.getResourceName(),
            action,
            data: this.serializer.serialize(resource)
        })
    }

    sendInsert<E extends BaseEntity, R extends BaseResource>(entity: E, type: ClassType<R>) {
        this.send(entity, type, Action.Insert)
    }

    sendUpdate<E extends BaseEntity, R extends BaseResource>(entity: E, type: ClassType<R>) {
        this.send(entity, type, Action.Update)
    }

    sendDelete<E extends BaseEntity, R extends BaseResource>(entity: E, type: ClassType<R>) {
        this.send(entity, type, Action.Delete)
    }

}