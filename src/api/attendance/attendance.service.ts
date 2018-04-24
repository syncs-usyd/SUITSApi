import { Component, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { AttendanceEntity, MemberEntity, EventEntity } from 'entities';
import { AttendanceResource } from 'resources';
import { WebSocketService } from 'core';
import { AttendanceDto } from './attendance.dto';

@Component()
export class AttendanceService {

    constructor(
        @InjectRepository(AttendanceEntity)
        private readonly repo: Repository<AttendanceEntity>,

        private readonly websocket: WebSocketService,
    ) {}

    async addAttendance(data: AttendanceDto, member: MemberEntity, event: EventEntity): Promise<AttendanceEntity> {
        let attendance = this.repo.create({...data})
        attendance.member = member
        attendance.event = event
        attendance = await this.repo.save(attendance)

        // need to retrieve the entity with the event and member data joined (.save doesn't do it...)
        attendance = (await this.repo.findOneById(attendance.id))!

        this.websocket.sendInsert(attendance)
        return attendance
    }

    findAttendance(options?: {memberId?: number, eventId?: number}): Promise<AttendanceEntity[]> {
        return this.repo.find({where: options})
    }

    getAttendance(id: number): Promise<AttendanceEntity | undefined> {
        return this.repo.findOneById(id)
    }

    async updateAttendance(id: number, data: AttendanceDto): Promise<AttendanceEntity | undefined> {
        let attendance = await this.repo.findOneById(id)
        if (!attendance)
            return undefined

        attendance = this.repo.merge(attendance, data)
        attendance = await this.repo.save(attendance)

        this.websocket.sendUpdate(attendance)
        return attendance
    }

    async deleteAttendance(id: number): Promise<AttendanceEntity | undefined> {
        let attendance = await this.repo.findOneById(id)
        if (!attendance)
            return undefined

        await this.repo.deleteById(id)

        this.websocket.sendDelete(attendance)
        return attendance
    }

}
