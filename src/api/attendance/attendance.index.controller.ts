import { UseInterceptors, Controller, Get, Query, Post, ValidationPipe, Body, UseGuards, HttpException } from "@nestjs/common";
import { ApiUseTags, ApiResponse, ApiOperation, ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsNumberString, IsOptional, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";
import { pickBy, identity } from 'lodash'

import { AttendanceEntity, MemberEntity } from "entities";
import { AttendanceResource } from "resources";
import { SerializerInterceptor, AuthGuard } from "core";
import { MembersService } from 'api/members'
import { EventsService } from 'api/events'

import { AttendanceService } from './attendance.service'
import { AttendanceDto } from "./attendance.dto";
import { OptionalAttendanceQuery, AttendanceQuery } from "./attendance.query";


@ApiUseTags('attendance')
@Controller(new AttendanceResource().prefix)
@UseGuards(AuthGuard)
@UseInterceptors(SerializerInterceptor)
export class AttendanceIndexController {

    constructor(
        private readonly membersService: MembersService,
        private readonly eventsService: EventsService,
        private readonly attendanceService: AttendanceService
    ) {}

    @Get()
    @ApiOperation({
        title: "Get all attendance",
        description: "Retrieve attendance, filtering by the event and member IDs if needed.",
    })
    @ApiResponse({
        status: 200,
        type: AttendanceResource,
    })
    getAttendance(
        @Query(new ValidationPipe({transform: true})) attendanceFilter: OptionalAttendanceQuery
    ): Promise<AttendanceEntity[]> {
        let options = pickBy({ memberId: attendanceFilter.member, eventId: attendanceFilter.event }, identity)
        return this.attendanceService.findAttendance(options);
    }

    @Post()
    @ApiOperation({
        title: "Add a new attendance record",
        description: "Add a new attendance record. Event and Member IDs must be provided.",
    })
    @ApiResponse({
        status: 200,
        type: AttendanceResource,
    })
    async addAttendance(
        @Query(new ValidationPipe({transform: true})) attendanceQuery: AttendanceQuery,
        @Body(new ValidationPipe({transform: true})) data: AttendanceDto
    ): Promise<AttendanceEntity> {
        let member = await this.membersService.getMember(attendanceQuery.member)
        if (!member)
            throw new HttpException(`Member with id ${attendanceQuery.member} could not be found.`, 400)

        let event = await this.eventsService.getEvent(attendanceQuery.event)
        if (!event)
            throw new HttpException(`Event with id ${attendanceQuery.event} could not be found.`, 400)

        let att = await this.attendanceService.findAttendance({memberId: attendanceQuery.member, eventId: attendanceQuery.event})
        if (att.length == 1)
            throw new HttpException(`Attendance record for member ${member.id} and event ${event.id} already exists.`, 400)

        return this.attendanceService.addAttendance(data, member, event);
    }
}