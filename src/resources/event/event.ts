import { Event } from "interfaces/event";
import { BaseResource } from "resources/resource.base";
import { Allow, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { AttendanceResource } from "resources/attendance";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

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

    @ApiModelPropertyOptional({isArray: true, type: AttendanceResource})
    @Type(() => AttendanceResource)
    @ValidateNested()
    membersAttended?: AttendanceResource[];

    get prefix(): string {
        return '/events'
    }

    getResourceName(): string {
        return "Event"
    }
}