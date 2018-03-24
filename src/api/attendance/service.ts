import { Component } from '@nestjs/common';
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

    async add(att: AttendanceDto, eventId: number, memberId: number): Promise<AttendanceEntity> {
        let m = this.repo.create(att)
        m.memberId = memberId;
        m.eventId = eventId;
        await this.repo.save(m)
        return this.get(m.id);
    }

    getAll(): Promise<AttendanceEntity[]> {
        return this.repo.find()
    }

    get(id: number): Promise<AttendanceEntity> {
        return this.repo.findOneById(id, { relations: [ 'member', 'event' ] })
    }

    edit(id: number, att: AttendanceDto): Promise<void> {
        return this.repo.updateById(id, att);
    }

    delete(id: number): Promise<void> {
        return this.repo.deleteById(id);
    }

}
