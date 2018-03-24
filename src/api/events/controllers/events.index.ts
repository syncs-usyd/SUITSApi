import { UseInterceptors, Controller, Get, Query, Post, ValidationPipe, Body } from "@nestjs/common";

import { EventEntity } from "entities";
import { Serializer } from "utils/Serializer";
import { EventResource } from "resources/event/event";
import { EventService } from "api/events/service";
import { EventTargetLike } from "rxjs/observable/FromEventObservable";
import { EventDto } from "api/events/dto";


@Controller(new EventResource().prefix)
@UseInterceptors(Serializer(EventResource))
export class EventIndexController {

    constructor(
        private readonly eventService: EventService
    ) {}

    @Get()
    getEvents(): Promise<EventEntity[]> {
        return this.eventService.getAll();
    }

    @Post()
    addEvent(@Body(new ValidationPipe()) data: EventDto): Promise<EventEntity> {
        return this.eventService.add(data);
    }
}
