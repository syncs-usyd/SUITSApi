import { Component, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceDto } from './attendance.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { AttendanceEntity } from 'entities';
import { BaseEntityService } from 'utils/entity.service.base';
import { AttendanceResource } from 'resources/attendance';
import { WebSocketService } from 'websocket/service';

@Component()
export class AttendanceService extends BaseEntityService<AttendanceEntity, AttendanceResource> {

    constructor(
        @InjectRepository(AttendanceEntity)
        repo: Repository<AttendanceEntity>,
        websocket: WebSocketService
    ) {super(repo, websocket, AttendanceResource)}

    async addAttendance(data: AttendanceDto, memberId: number, eventId: number): Promise<AttendanceEntity> {
        return this.insert({...data, memberId, eventId})
    }

    findAttendance(options?: {memberId?: number, eventId?: number}): Promise<AttendanceEntity[]> {
        return this.repo.find(options)
    }

    getAttendance(id: number): Promise<AttendanceEntity | undefined> {
        return this.repo.findOneById(id)
    }

    updateAttendance(id: number, data: AttendanceDto): Promise<AttendanceEntity | undefined> {
        return this.update(id, data)
    }

    deleteAttendance(id: number): Promise<AttendanceEntity | undefined> {
        return this.delete(id)
    }

}
