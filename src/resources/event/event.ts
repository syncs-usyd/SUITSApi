import { Event } from "interfaces/event";
import { BaseResource } from "resources/resource.base";

export class EventResource extends BaseResource implements Event {

    id: number;

    title: string;

    description?: string;

    time: Date;

    get prefix(): string {
        return '/events'
    }

    getResourceName(): string {
        return "Event"
    }
}