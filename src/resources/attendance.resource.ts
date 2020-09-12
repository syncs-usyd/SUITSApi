import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { Allow } from "class-validator";

import { IAttendance } from "../interfaces";

import { BaseResource } from "./base.resource";
import { EventResource } from "./event.resource";
import { MemberResource } from "./member.resource";

export class AttendanceResource extends BaseResource implements IAttendance {
    @ApiProperty()
    @Allow()
    public id: number;

    @ApiProperty()
    @Allow()
    public primary: boolean;

    @ApiProperty()
    @Allow()
    public secondary: number;

    @ApiPropertyOptional()
    @Allow()
    public additional?: string;

    @ApiProperty()
    @Allow()
    public paidByCard: boolean;

    @ApiPropertyOptional()
    @Allow()
    public memberId: number;

    @ApiPropertyOptional()
    @Allow()
    public eventId: number;

    get prefix(): string {
        return "/attendance";
    }

    public getResourceName(): string {
        return "Attendance";
    }
}
