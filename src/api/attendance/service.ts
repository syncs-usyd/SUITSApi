import { Component, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceDto } from './dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { AttendanceEntity } from 'entities';

@Component()
export class AttendanceService {
    constructor(
        @InjectRepository(AttendanceEntity)
        private readonly repo: Repository<AttendanceEntity>
    ) {}

    async add(data: AttendanceDto, memberId: number, eventId: number): Promise<AttendanceEntity> {
        let att = this.repo.create(data)
        att.memberId = memberId;
        att.eventId = eventId;
        att = await this.repo.save(att)
        return this.get(att.id);
    }

    find(options?: {memberId?: number, eventId?: number}): Promise<AttendanceEntity[]> {
        return this.repo.find(options)
    }

    async get(id: number): Promise<AttendanceEntity> {
        let a = await this.repo.findOneById(id, { relations: [ 'member', 'event' ] })
        if (!a)
            throw new NotFoundException()

        return a
    }

    async edit(id: number, data: AttendanceDto): Promise<void> {
        let att = await this.get(id)
        att = this.repo.merge(att, data)
        this.repo.save(att)
    }

    async delete(id: number): Promise<void> {
        let att = await this.get(id)
        this.repo.delete(att)
    }

}
