import { UseInterceptors, Controller, Get, Query, Post, ValidationPipe, Body, UseGuards } from "@nestjs/common";
import { ApiUseTags, ApiResponse, ApiOperation, ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsNumberString, IsOptional, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";
import { pickBy, identity } from 'lodash'

import { AttendanceEntity } from "entities";
import { AttendanceResource } from "resources/attendance";
import { Serializer } from "serializer/interceptor";
import { AuthGuard } from "api/auth/auth.guard";

import { AttendanceService } from "./attendance.service";
import { AttendanceDto } from "./attendance.dto";
import { OptionalAttendanceQuery, AttendanceQuery } from "./attendance.query";


@ApiUseTags('attendance')
@Controller(new AttendanceResource().prefix)
@UseGuards(AuthGuard)
@UseInterceptors(Serializer(AttendanceResource))
export class AttendanceIndexController {

    constructor(
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
    getAttendance(@Query(new ValidationPipe({transform: true})) attendanceFilter: OptionalAttendanceQuery): Promise<AttendanceEntity[]> {
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
    addAttendance(@Query(new ValidationPipe({transform: true})) attendanceQuery: AttendanceQuery, @Body(new ValidationPipe({transform: true})) data: AttendanceDto): Promise<AttendanceEntity> {
        return this.attendanceService.addAttendance(data, attendanceQuery.member, attendanceQuery.event);
    }
}