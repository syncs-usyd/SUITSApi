import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { WebSocketService } from "../../core";
import { EventEntity } from "../../entities";
import { EventDto } from "./events.dto";

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(EventEntity)
        private readonly repo: Repository<EventEntity>,
        private readonly websocket: WebSocketService,
    ) {}

    public async addEvent(data: EventDto): Promise<EventEntity> {
        let event = this.repo.create(data);
        event = await this.repo.save(event);
        this.websocket.sendInsert(event);

        return event;
    }

    public async getAllEvents(): Promise<EventEntity[]> {
        return await this.repo.find();
    }

    public getEvent(id: number): Promise<EventEntity | undefined> {
        return this.repo.findOne(id, { relations: ["membersAttended"] });
    }

    public async updateEvent(
        id: number,
        data: EventDto,
    ): Promise<EventEntity | undefined> {
        let event = await this.repo.findOne(id);
        if (!event) {
            return undefined;
        }

        event = this.repo.merge(event, data);
        event = await this.repo.save(event);

        this.websocket.sendUpdate(event);
        return event;
    }

    public async deleteEvent(id: number): Promise<EventEntity | undefined> {
        const event = await this.repo.findOne(id);
        if (!event) {
            return undefined;
        }

        await this.repo.delete(id);

        this.websocket.sendDelete(event);
        return event;
    }
}
