import { UseInterceptors, Controller, Get, Query, Post, ValidationPipe, Body, UseGuards } from "@nestjs/common";

import { AttendanceEntity } from "entities";
import { AttendanceResource } from "resources/attendance";
import { Serializer } from "serializer/interceptor";

import { AttendanceService } from "api/attendance/service";
import { AttendanceDto } from "api/attendance/dto";
import { IsNumber, IsNumberString, IsOptional, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";
import { pickBy, identity } from 'lodash'
import { ApiUseTags, ApiResponse, ApiOperation, ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { ApiGuard } from "api/auth/guard.api";

class AttendanceQuery {

    @ApiModelProperty()
    @Transform((m: string) => Number(m))
    @IsNumber()
    member: number

    @ApiModelProperty()
    @Transform((e: string) => Number(e))
    @IsNumber()
    event: number
}

class OptionalAttendanceQuery {

    @ApiModelPropertyOptional()
    @Transform((m: string) => Number(m))
    @IsOptional()
    @IsNumber()
    member: number

    @ApiModelPropertyOptional()
    @Transform((m: string) => Number(m))
    @IsOptional()
    @IsNumber()
    event: number
}

@ApiUseTags('attendance')
@Controller(new AttendanceResource().prefix)
@UseGuards(ApiGuard)
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