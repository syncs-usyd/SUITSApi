import { Component, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { EventEntity } from "entities";
import { EventResource } from "resources";
import { WebSocketService } from "core";
import { EventDto } from "./events.dto";

@Component()
export class EventsService {
    constructor(
        @InjectRepository(EventEntity)
        private readonly repo: Repository<EventEntity>,
        private readonly websocket: WebSocketService
    ) {}

    async addEvent(data: EventDto): Promise<EventEntity> {
        let event = this.repo.create(data);
        event = await this.repo.save(event);
        this.websocket.sendInsert(event);

        return event;
    }

    async getAllEvents(): Promise<EventEntity[]> {
        return await this.repo.find();
    }

    getEvent(id: number): Promise<EventEntity | undefined> {
        return this.repo.findOneById(id, { relations: ["membersAttended"] });
    }

    async updateEvent(
        id: number,
        data: EventDto
    ): Promise<EventEntity | undefined> {
        let event = await this.repo.findOneById(id);
        if (!event) return undefined;

        event = this.repo.merge(event, data);
        event = await this.repo.save(event);

        this.websocket.sendUpdate(event);
        return event;
    }

    async deleteEvent(id: number): Promise<EventEntity | undefined> {
        let event = await this.repo.findOneById(id);
        if (!event) return undefined;

        await this.repo.deleteById(id);

        this.websocket.sendDelete(event);
        return event;
    }
}
