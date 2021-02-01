import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthGuard, SerializerInterceptor } from "../../core";
import { EventEntity } from "../../entities";
import { EventResource } from "../../resources";

import { EventDto } from "./events.dto";
import { EventsService } from "./events.service";

@ApiTags("events")
@Controller(new EventResource().prefix)
@UseGuards(AuthGuard)
@UseInterceptors(SerializerInterceptor)
export class EventsIndexController {
    constructor(private readonly service: EventsService) {}

    @Get()
    @ApiOperation({
        summary: "Retrieve all events",
        description:
            "Retrieve all events that are in the system. Does not return attendances for the events.",
    })
    @ApiResponse({
        status: 200,
        type: EventResource,
    })
    public getEvents(): Promise<EventEntity[]> {
        return this.service.getAllEvents();
    }

    @Post()
    @ApiOperation({
        summary: "Add a new event",
        description: "Add a new event to the system.",
    })
    @ApiResponse({
        status: 200,
        type: EventResource,
    })
    public addEvent(
        @Body(new ValidationPipe()) data: EventDto,
    ): Promise<EventEntity> {
        return this.service.addEvent(data);
    }
}
