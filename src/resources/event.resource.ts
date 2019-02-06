import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { Allow, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { Event } from "interfaces";

import { BaseResource } from "./base.resource";
import { AttendanceResource } from "./attendance.resource";

export class EventResource extends BaseResource implements Event {
    @ApiModelProperty()
    @Allow()
    id: number;

    @ApiModelProperty()
    @Allow()
    title: string;

    @ApiModelPropertyOptional()
    @Allow()
    description?: string;

    @ApiModelProperty()
    @Allow()
    time: Date;

    @ApiModelPropertyOptional({ isArray: true, type: AttendanceResource })
    @Type(() => AttendanceResource)
    @ValidateNested()
    membersAttended?: AttendanceResource[];

    get prefix(): string {
        return "/events";
    }

    getResourceName(): string {
        return "Event";
    }

    getType(): new (...args: any[]) => BaseResource {
        return EventResource;
    }
}
