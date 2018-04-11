import { Controller, Get, Put, Delete, Param, Body, UseInterceptors, ValidationPipe, NotFoundException, HttpCode, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { EventEntity } from 'entities';
import { AuthGuard } from 'api/auth';
import { Serializer } from 'serializer/interceptor';
import { EventResource } from 'resources/event';

import { EventsService } from './events.service';
import { EventDto } from './events.dto';

@ApiUseTags("events")
@Controller(new EventResource().prefix+"/:id")
@UseGuards(AuthGuard)
@UseInterceptors(Serializer(EventResource))
export class EventsIdController {
    
    constructor(private readonly EventsService: EventsService) {}

    @Get()
    @ApiOperation({
        title: "Retrieve an event",
        description: "Retrieve an event with a given id.",
    })
    @ApiResponse({
        status: 200,
        type: EventResource,
    })
    async getEvent(@Param('id') id: number) : Promise<EventEntity> {
        let event = await this.EventsService.getEvent(id)
        if (!event)
            throw new NotFoundException

        return event
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
    async editEvent(@Param('id') id: number, @Body(new ValidationPipe({transform: true})) event: EventDto) : Promise<EventEntity> {
        let e = await this.EventsService.updateEvent(id, event)
        if (!e)
            throw new NotFoundException

        return e
    }

    @Delete()
    @HttpCode(204)
    @ApiOperation({
        title: "Delete an event",
        description: "Delete the event and all attendance associated with it.",
    })
    async deleteEvent(@Param('id') id: number) : Promise<void> {
        let e = this.EventsService.deleteEvent(id);
    }

}

