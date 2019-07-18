import {
    Body,
    Controller,
    Get,
    HttpException,
    Post,
    Query,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiUseTags } from "@nestjs/swagger";
import { identity, pickBy } from "lodash";

import { AuthGuard, SerializerInterceptor } from "../../core";
import { AttendanceEntity } from "../../entities";
import { AttendanceResource } from "../../resources";
import { EventsService } from "../events";
import { MembersService } from "../members";

import { AttendanceDto } from "./attendance.dto";
import { AttendanceQuery, OptionalAttendanceQuery } from "./attendance.query";
import { AttendanceService } from "./attendance.service";

@ApiUseTags("attendance")
@Controller(new AttendanceResource().prefix)
@UseGuards(AuthGuard)
@UseInterceptors(SerializerInterceptor)
export class AttendanceIndexController {
    constructor(
        private readonly membersService: MembersService,
        private readonly eventsService: EventsService,
        private readonly attendanceService: AttendanceService,
    ) {}

    @Get()
    @ApiOperation({
        title: "Get all attendance",
        description:
            "Retrieve attendance, filtering by the event and member IDs if needed.",
    })
    @ApiResponse({
        status: 200,
        type: AttendanceResource,
    })
    public getAttendance(
        @Query(new ValidationPipe({ transform: true }))
        attendanceFilter: OptionalAttendanceQuery,
    ): Promise<AttendanceEntity[]> {
        const options = pickBy(
            {
                memberId: attendanceFilter.member,
                eventId: attendanceFilter.event,
            },
            identity,
        );
        return this.attendanceService.findAttendance(options);
    }

    @Post()
    @ApiOperation({
        title: "Add a new attendance record",
        description:
            "Add a new attendance record. Event and Member IDs must be provided.",
    })
    @ApiResponse({
        status: 200,
        type: AttendanceResource,
    })
    public async addAttendance(
        @Query(new ValidationPipe({ transform: true }))
        attendanceQuery: AttendanceQuery,
        @Body(new ValidationPipe({ transform: true })) data: AttendanceDto,
    ): Promise<AttendanceEntity> {
        const member = await this.membersService.getMember(
            attendanceQuery.member,
        );
        if (!member) {
            throw new HttpException(
                `Member with id ${attendanceQuery.member} could not be found.`,
                400,
            );
        }

        const event = await this.eventsService.getEvent(attendanceQuery.event);
        if (!event) {
            throw new HttpException(
                `Event with id ${attendanceQuery.event} could not be found.`,
                400,
            );
        }

        const att = await this.attendanceService.findAttendance({
            memberId: attendanceQuery.member,
            eventId: attendanceQuery.event,
        });
        if (att.length == 1) {
            throw new HttpException(
                `Attendance record for member ${member.id} and event ${
                    event.id
                } already exists.`,
                400,
            );
        }

        return this.attendanceService.addAttendance(data, member, event);
    }
}
