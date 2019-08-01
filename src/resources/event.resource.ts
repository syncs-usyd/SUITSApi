import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Allow, ValidateNested } from "class-validator";

import { IEvent } from "../interfaces";

import { AttendanceResource } from "./attendance.resource";
import { BaseResource } from "./base.resource";

export class EventResource extends BaseResource implements IEvent {
    @ApiModelProperty()
    @Allow()
    public id: number;

    @ApiModelProperty()
    @Allow()
    public title: string;

    @ApiModelPropertyOptional()
    @Allow()
    public description?: string;

    @ApiModelProperty()
    @Allow()
    public time: Date;

    @ApiModelPropertyOptional({ isArray: true, type: AttendanceResource })
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
