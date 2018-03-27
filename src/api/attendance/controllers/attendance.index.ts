import { UseInterceptors, Controller, Get, Query, Post, ValidationPipe, Body } from "@nestjs/common";

import { AttendanceEntity } from "entities";
import { AttendanceResource } from "resources/attendance";
import { Serializer } from "serializer/interceptor";

import { AttendanceService } from "api/attendance/service";
import { AttendanceDto } from "api/attendance/dto";
import { IsNumber, IsNumberString } from "class-validator";

class AttendanceQuery {
    @IsNumberString()
    member: number

    @IsNumberString()
    event: number
}

@Controller(new AttendanceResource().prefix)
@UseInterceptors(Serializer(AttendanceResource))
export class AttendanceIndexController {

    constructor(
        private readonly attendanceService: AttendanceService
    ) {}

    @Get()
    getAttendance(@Query() attendanceFilter: {member?: number, event?: number}): Promise<AttendanceEntity[]> {
        return this.attendanceService.find({memberId: attendanceFilter.member, eventId: attendanceFilter.event});
    }

    @Post()
    addAttendance(@Query(new ValidationPipe()) attendanceQuery: AttendanceQuery, @Body(new ValidationPipe({transform: true})) data: AttendanceDto): Promise<AttendanceEntity> {
        return this.attendanceService.add(data, attendanceQuery.member, attendanceQuery.event);
    }
}