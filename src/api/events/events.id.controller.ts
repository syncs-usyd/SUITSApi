import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Put,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiUseTags } from "@nestjs/swagger";

import { AuthGuard, SerializerInterceptor } from "../../core";
import { EventEntity } from "../../entities";
import { EventResource } from "../../resources";

import { EventDto } from "./events.dto";
import { EventsService } from "./events.service";

@ApiUseTags("events")
@Controller(new EventResource().prefix + "/:id")
@UseGuards(AuthGuard)
@UseInterceptors(SerializerInterceptor)
export class EventsIdController {
    constructor(private readonly service: EventsService) {}

    @Get()
    @ApiOperation({
        title: "Retrieve an event",
        description: "Retrieve an event with a given id.",
    })
    @ApiResponse({
        status: 200,
        type: EventResource,
    })
    public async getEvent(@Param("id") id: number): Promise<EventEntity> {
        const event = await this.service.getEvent(id);
        if (!event) {
            throw new NotFoundException();
        }

        return event;
    }

    @Put()
    @ApiOperation({
        title: "Update an event",
        description: "Update data about the event with a given id.",
    })
    @ApiResponse({
        status: 200,
        type: EventResource,
    })
    public async editEvent(
        @Param("id") id: number,
        @Body(new ValidationPipe({ transform: true })) event: EventDto,
    ): Promise<EventEntity> {
        const e = await this.service.updateEvent(id, event);
        if (!e) {
            throw new NotFoundException();
        }

        return e;
    }

    @Delete()
    @HttpCode(204)
    @ApiOperation({
        title: "Delete an event",
        description: "Delete the event and all attendance associated with it.",
    })
    public async deleteEvent(@Param("id") id: number): Promise<void> {
        const e = this.service.deleteEvent(id);
    }
}
