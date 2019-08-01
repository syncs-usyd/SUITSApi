import { Injectable } from "@nestjs/common";
import * as SocketIO from "socket.io";

import { BaseResource } from "../../resources/base.resource";

import { SerializerService } from "..";
import { BaseEntity } from "../../entities/base.entity";
import { Action } from "./action.enum";
import { WebSocketGateway } from "./websocket.gateway";

@Injectable()
export class WebSocketService {
    constructor(
        private readonly serializer: SerializerService,
        private readonly gateway: WebSocketGateway,
    ) {}

    public sendInsert(entity: BaseEntity) {
        this.send(entity, Action.Insert);
    }

    public sendUpdate(entity: BaseEntity) {
        this.send(entity, Action.Update);
    }

    public sendDelete(entity: BaseEntity) {
        this.send(entity, Action.Delete);
    }

    private getSocket(): SocketIO.Server {
        return this.gateway.server;
    }

    private send(entity: BaseEntity, action: Action) {
        const resource = this.serializer.getResource(entity) as BaseResource; // websockets will only receive single resources
        this.getSocket().send({
            action,
            data: this.serializer.serialize(resource),
            resource: resource.getResourceName(),
        });
    }
}
