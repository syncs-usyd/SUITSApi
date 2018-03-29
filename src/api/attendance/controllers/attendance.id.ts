import { UseInterceptors, Controller, Get, Query, Post, ValidationPipe, Body, Param, Put, HttpCode, Delete, NotFoundException } from "@nestjs/common";

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
    async getAttendance(@Param('id') id: number): Promise<AttendanceEntity> {
        let a = await this.attendanceService.getAttendance(id);
        if (!a)
            throw new NotFoundException

        return a
    }

    @Put()
    async updateAttendance(@Param('id') id: number, @Body(new ValidationPipe({transform: true})) data: AttendanceDto): Promise<AttendanceEntity> {
        let a = await this.attendanceService.updateAttendance(id, data);
        if (!a)
            throw new NotFoundException

        return a
    }

    @Delete()
    @HttpCode(204)
    async deleteAttendance(@Param('id') id: number): Promise<void> {
        let a = await this.attendanceService.deleteAttendance(id);
        if (!a)
            throw new NotFoundException
    }

}
