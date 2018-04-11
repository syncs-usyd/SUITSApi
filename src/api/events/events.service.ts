import { Component, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventEntity } from 'entities';
import { EventResource } from 'resources/event';
import { BaseEntityService } from 'utils/entity.service.base';
import { WebSocketService } from 'websocket/service';

import { EventDto } from './events.dto';

@Component()
export class EventsService extends BaseEntityService<EventEntity, EventResource> {

    constructor(
        @InjectRepository(EventEntity)
        repo: Repository<EventEntity>,
        websocket: WebSocketService
    ) { super(repo, websocket, EventResource) }

    addEvent(data: EventDto): Promise<EventEntity> {
        return this.insert(data)
    }

    async getAllEvents(): Promise<EventEntity[]> {
        return await this.repo.find()
    }

    getEvent(id: number): Promise<EventEntity | undefined> {
        return this.repo.findOneById(id, { relations: [ 'membersAttended' ] })
    }

    updateEvent(id: number, data: EventDto): Promise<EventEntity | undefined> {
        return this.update(id, data)
    }

    deleteEvent(id: number): Promise<EventEntity | undefined> {
        return this.delete(id)
    }

}
