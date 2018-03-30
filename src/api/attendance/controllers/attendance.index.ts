import { UseInterceptors, Controller, Get, Query, Post, ValidationPipe, Body } from "@nestjs/common";

import { AttendanceEntity } from "entities";
import { AttendanceResource } from "resources/attendance";
import { Serializer } from "serializer/interceptor";

import { AttendanceService } from "api/attendance/service";
import { AttendanceDto } from "api/attendance/dto";
import { IsNumber, IsNumberString, IsOptional, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";
import { pickBy, identity } from 'lodash'

class AttendanceQuery {
    @Transform((m: string) => Number(m))
    @IsNumber()
    member: number

    @Transform((e: string) => Number(e))
    @IsNumber()
    event: number
}

class OptionalAttendanceQuery extends AttendanceQuery {

    @IsOptional()
    member: number

    @IsOptional()
    event: number
}

@Controller(new AttendanceResource().prefix)
@UseInterceptors(Serializer(AttendanceResource))
export class AttendanceIndexController {

    constructor(
        private readonly attendanceService: AttendanceService
    ) {}

    @Get()
    getAttendance(@Query(new ValidationPipe({transform: true})) attendanceFilter: OptionalAttendanceQuery): Promise<AttendanceEntity[]> {
        let options = pickBy({ memberId: attendanceFilter.member, eventId: attendanceFilter.event }, identity)
        return this.attendanceService.findAttendance(options);
    }

    @Post()
    addAttendance(@Query(new ValidationPipe({transform: true})) attendanceQuery: AttendanceQuery, @Body(new ValidationPipe({transform: true})) data: AttendanceDto): Promise<AttendanceEntity> {
        return this.attendanceService.addAttendance(data, attendanceQuery.member, attendanceQuery.event);
    }
}