import { Controller, Get, Put, Delete, Param, Body, UseInterceptors, ValidationPipe, NotFoundException, HttpCode } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { EventEntity } from 'entities';
import { Serializer } from 'serializer/interceptor';
import { EventResource } from 'resources/event';

import { EventService } from '../service';
import { EventDto } from '../dto';

@Controller(new EventResource().prefix+"/:id")
@UseInterceptors(Serializer(EventResource))
export class EventIdController {
    
    constructor(private readonly eventService: EventService) {}

    @Get()
    async getEvent(@Param('id') id: number) : Promise<EventEntity> {
        let event = await this.eventService.getEvent(id)
        if (!event)
            throw new NotFoundException

        return event
    }

    @Put()
    async editEvent(@Param('id') id: number, @Body(new ValidationPipe({transform: true})) event: EventDto) : Promise<EventEntity> {
        let e = await this.eventService.updateEvent(id, event)
        if (!e)
            throw new NotFoundException

        return e
    }

    @Delete()
    @HttpCode(204)
    async deleteEvent(@Param('id') id: number) : Promise<void> {
        let e = this.eventService.deleteEvent(id);
    }

}

