import { UseInterceptors, Controller, Get, Query, Post, ValidationPipe, Body, UseGuards } from "@nestjs/common";
import { ApiUseTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { EventTargetLike } from "rxjs/observable/FromEventObservable";

import { EventEntity } from "entities";
import { Serializer } from "serializer/interceptor";
import { EventResource } from "resources/event/event";
import { AuthGuard } from "api/auth";

import { EventsService } from "./events.service";
import { EventDto } from "./events.dto";

@ApiUseTags("events")
@Controller(new EventResource().prefix)
@UseGuards(AuthGuard)
@UseInterceptors(Serializer(EventResource))
export class EventsIndexController {

    constructor(
        private readonly EventsService: EventsService
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
        return this.EventsService.getAllEvents();
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
        return this.EventsService.addEvent(data);
    }
}
