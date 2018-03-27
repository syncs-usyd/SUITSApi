import { UseInterceptors, Controller, Get, Query, Post, ValidationPipe, Body, Param, Put, HttpCode, Delete } from "@nestjs/common";

import { AttendanceEntity } from "entities";
import { AttendanceResource } from "resources/attendance";
import { Serializer } from "serializer/interceptor";

import { AttendanceService } from "api/attendance/service";
import { AttendanceDto } from "api/attendance/dto";

@Controller(new AttendanceResource().prefix+"/:id")
@UseInterceptors(Serializer(AttendanceResource))
export class AttendanceIdController {

    constructor(
        private readonly attendanceService: AttendanceService
    ) {}

    @Get()
    getAttendance(@Param('id') id: number): Promise<AttendanceEntity> {
        return this.attendanceService.get(id);
    }

    @Put()
    @HttpCode(204)
    updateAttendance(@Param('id') id: number, @Body(new ValidationPipe({transform: true})) data: AttendanceDto): Promise<void> {
        return this.attendanceService.edit(id, data);
    }

    @Delete()
    @HttpCode(204)
    deleteAttendance(@Param('id') id: number): Promise<void> {
        return this.attendanceService.delete(id);
    }

}
