import { Event } from "interfaces/event";
import { BaseResource } from "resources/resource.base";
import { Allow } from "class-validator";

export class EventResource extends BaseResource implements Event {

    @Allow()
    id: number;

    @Allow()
    title: string;

    @Allow()
    description?: string;

    @Allow()
    time: Date;

    get prefix(): string {
        return '/events'
    }

    getResourceName(): string {
        return "Event"
    }
}