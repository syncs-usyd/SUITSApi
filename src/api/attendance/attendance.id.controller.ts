import {
    UseInterceptors,
    Controller,
    Get,
    ValidationPipe,
    Body,
    Param,
    Put,
    HttpCode,
    Delete,
    NotFoundException,
    UseGuards,
} from "@nestjs/common";
import { ApiUseTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

import { AttendanceEntity } from "entities";
import { AttendanceResource } from "resources";
import { SerializerInterceptor } from "core";
import { AuthGuard } from "core";

import { AttendanceService } from "./attendance.service";
import { AttendanceDto } from "./attendance.dto";

@ApiUseTags("attendance")
@Controller(new AttendanceResource().prefix + "/:id")
@UseGuards(AuthGuard)
@UseInterceptors(SerializerInterceptor)
export class AttendanceIdController {
    constructor(private readonly attendanceService: AttendanceService) {}

    @Get()
    @ApiOperation({
        title: "Retrieve an attendance record",
        description:
            "Retrieve a record of attendance associated with a given id.",
    })
    @ApiResponse({
        status: 200,
        type: AttendanceEntity,
    })
    async getAttendance(@Param("id") id: number): Promise<AttendanceEntity> {
        let a = await this.attendanceService.getAttendance(id);
        if (!a) throw new NotFoundException();

        return a;
    }

    @Put()
    @ApiOperation({
        title: "Update an attendance record",
        description:
            "Update the attendance record associated with the given id.",
    })
    @ApiResponse({
        status: 200,
        type: AttendanceEntity,
    })
    async updateAttendance(
        @Param("id") id: number,
        @Body(new ValidationPipe({ transform: true })) data: AttendanceDto,
    ): Promise<AttendanceEntity> {
        let a = await this.attendanceService.updateAttendance(id, data);
        if (!a) throw new NotFoundException();

        return a;
    }

    @Delete()
    @HttpCode(204)
    @ApiOperation({
        title: "Delete an attendance record",
        description:
            "Delete the attendance record associated with the given id.",
    })
    async deleteAttendance(@Param("id") id: number): Promise<void> {
        let a = await this.attendanceService.deleteAttendance(id);
        if (!a) throw new NotFoundException();
    }
}
