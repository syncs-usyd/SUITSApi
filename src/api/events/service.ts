import { Component, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventDto } from './dto';
import { EventEntity } from 'entities';

@Component()
export class EventService {
    constructor(
        @InjectRepository(EventEntity)
        private readonly repo: Repository<EventEntity>
    ) {}

    async add(data: EventDto): Promise<EventEntity> {
        let event = this.repo.create(data);
        event = await this.repo.save(event);
        return this.get(event.id)
    }

    getAll(): Promise<EventEntity[]> {
        return this.repo.find()
    }

    async get(id: number): Promise<EventEntity> {
        let e = await this.repo.findOneById(id, { relations: [ 'membersAttended' ] })
        if (!e)
            throw new NotFoundException()
        return e;
    }

    async edit(id: number, data: EventDto): Promise<void> {
        let event = await this.get(id)
        event = this.repo.merge(event, data)
        await this.repo.save(event)
    }

    async delete(id: number): Promise<void> {
        let event = await this.get(id)
        await this.repo.remove(event)
    }

}
