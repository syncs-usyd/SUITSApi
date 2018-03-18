import { BaseEntity } from "utils/baseentity";
import { Action } from "./Action";

export class WebSocketUpdateMessage<T extends BaseEntity> {
    resource: string;
    action: Action;
    data: T;

    constructor(resource: string, action: Action, data: T) {
        this.resource = resource;
        this.action = action;
        this.data = data;
    }
}