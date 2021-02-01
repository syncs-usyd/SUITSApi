import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Put,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthGuard, SerializerInterceptor } from "../../core";
import { AttendanceEntity } from "../../entities";
import { AttendanceResource } from "../../resources";

import { AttendanceDto } from "./attendance.dto";
import { AttendanceService } from "./attendance.service";

@ApiTags("attendance")
@Controller(new AttendanceResource().prefix + "/:id")
@UseGuards(AuthGuard)
@UseInterceptors(SerializerInterceptor)
export class AttendanceIdController {
    constructor(private readonly attendanceService: AttendanceService) {}

    @Get()
    @ApiOperation({
        summary: "Retrieve an attendance record",
        description:
            "Retrieve a record of attendance associated with a given id.",
    })
    @ApiResponse({
        status: 200,
        type: AttendanceEntity,
    })
    public async getAttendance(
        @Param("id") id: number,
    ): Promise<AttendanceEntity> {
        const a = await this.attendanceService.getAttendance(id);
        if (!a) {
            throw new NotFoundException();
        }

        return a;
    }

    @Put()
    @ApiOperation({
        summary: "Update an attendance record",
        description:
            "Update the attendance record associated with the given id.",
    })
    @ApiResponse({
        status: 200,
        type: AttendanceEntity,
    })
    public async updateAttendance(
        @Param("id") id: number,
        @Body(new ValidationPipe({ transform: true })) data: AttendanceDto,
    ): Promise<AttendanceEntity> {
        const a = await this.attendanceService.updateAttendance(id, data);
        if (!a) {
            throw new NotFoundException();
        }

        return a;
    }

    @Delete()
    @HttpCode(204)
    @ApiOperation({
        summary: "Delete an attendance record",
        description:
            "Delete the attendance record associated with the given id.",
    })
    public async deleteAttendance(@Param("id") id: number): Promise<void> {
        const a = await this.attendanceService.deleteAttendance(id);
        if (!a) {
            throw new NotFoundException();
        }
    }
}
