import { UseInterceptors, Controller, Get, Query, Post, ValidationPipe, Body, UseGuards } from "@nestjs/common";

import { EventEntity } from "entities";
import { Serializer } from "serializer/interceptor";
import { EventResource } from "resources/event/event";
import { EventService } from "api/events/service";
import { EventTargetLike } from "rxjs/observable/FromEventObservable";
import { EventDto } from "api/events/dto";
import { ApiUseTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ApiGuard } from "api/auth/guard.api";

@ApiUseTags("events")
@Controller(new EventResource().prefix)
@UseGuards(ApiGuard)
@UseInterceptors(Serializer(EventResource))
export class EventIndexController {

    constructor(
        private readonly eventService: EventService
    ) {}

    @Get()
    @ApiOperation({
        title: "Retrieve all events",
        description: "Retrieve all events that are in the system. Does not return attendances for the events.",
    })
    @ApiResponse({
        status: 200,
        type: EventResource,
    })
    getEvents(): Promise<EventEntity[]> {
        return this.eventService.getAllEvents();
    }

    @Post()
    @ApiOperation({
        title: "Add a new event",
        description: "Add a new event to the system.",
    })
    @ApiResponse({
        status: 200,
        type: EventResource,
    })
    addEvent(@Body(new ValidationPipe()) data: EventDto): Promise<EventEntity> {
        return this.eventService.addEvent(data);
    }
}
