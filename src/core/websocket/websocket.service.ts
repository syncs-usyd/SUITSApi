import { Component } from "@nestjs/common"
import * as SocketIO from 'socket.io'

import { BaseResource } from "resources/base.resource";

import { WebSocketGateway } from './websocket.gateway'
import { Action } from "./action.enum";
import { SerializerService } from "core";
import { ClassType } from "class-transformer/ClassTransformer";
import { BaseEntity } from "entities/base.entity";

@Component()
export class WebSocketService {

    constructor(
        private readonly serializer: SerializerService, 
        private readonly gateway: WebSocketGateway) {}

    private getSocket(): SocketIO.Server {
        return this.gateway.server
    }

    private send(entity: BaseEntity, action: Action) {
        let resource = this.serializer.getResource(entity) as BaseResource // websockets will only receive single resources
        console.log(entity)
        this.getSocket().send({
            resource: resource.getResourceName(),
            action,
            data: this.serializer.serialize(resource)
        })
    }

    sendInsert(entity: BaseEntity) {
        this.send(entity, Action.Insert)
    }

    sendUpdate(entity: BaseEntity) {
        this.send(entity, Action.Update)
    }

    sendDelete(entity: BaseEntity) {
        this.send(entity, Action.Delete)
    }

}