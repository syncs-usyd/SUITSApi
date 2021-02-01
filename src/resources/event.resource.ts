import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Allow, ValidateNested } from "class-validator";

import { IEvent } from "../interfaces";

import { AttendanceResource } from "./attendance.resource";
import { BaseResource } from "./base.resource";

export class EventResource extends BaseResource implements IEvent {
    @ApiProperty()
    @Allow()
    public id: number;

    @ApiProperty()
    @Allow()
    public title: string;

    @ApiPropertyOptional()
    @Allow()
    public description?: string;

    @ApiProperty()
    @Allow()
    public time: Date;

    @ApiPropertyOptional({ isArray: true, type: AttendanceResource })
    @Type(() => AttendanceResource)
    @ValidateNested()
    public membersAttended?: AttendanceResource[];

    get prefix(): string {
        return "/events";
    }

    public getResourceName(): string {
        return "Event";
    }
}
