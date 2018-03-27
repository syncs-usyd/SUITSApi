import { Controller, Get, Put, Delete, Param, Body, UseInterceptors, ValidationPipe, NotFoundException, HttpCode } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { EventEntity } from 'entities';
import { Serializer } from 'serializer/interceptor';
import { CompleteEventResource } from 'resources/event';

import { EventService } from '../service';
import { EventDto } from '../dto';

@Controller(new CompleteEventResource().prefix+"/:id")
@UseInterceptors(Serializer(CompleteEventResource))
export class EventIdController {
    
    constructor(private readonly eventService: EventService) {}

    @Get()
    async getMember(@Param('id') id: number) : Promise<EventEntity> {
        return this.eventService.get(id)
    }

    @Put()
    @HttpCode(204)
    editMember(@Param('id') id: number, @Body(new ValidationPipe({transform: true})) member: EventDto) : Promise<void> {
        return this.eventService.edit(id, member);
    }

    @Delete()
    @HttpCode(204)
    deleteMember(@Param('id') id: number) : Promise<void> {
        return this.eventService.delete(id);
    }

}

