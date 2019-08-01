import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { Allow } from "class-validator";

import { IAttendance } from "../interfaces";

import { BaseResource } from "./base.resource";
import { EventResource } from "./event.resource";
import { MemberResource } from "./member.resource";

export class AttendanceResource extends BaseResource implements IAttendance {
    @ApiModelProperty()
    @Allow()
    public id: number;

    @ApiModelProperty()
    @Allow()
    public primary: boolean;

    @ApiModelProperty()
    @Allow()
    public secondary: number;

    @ApiModelPropertyOptional()
    @Allow()
    public additional?: string;

    @ApiModelProperty()
    @Allow()
    public paidByCard: boolean;

    @ApiModelPropertyOptional()
    @Allow()
    @Type(() => MemberResource)
    @Transform((m: MemberResource) => {
        return { id: m.id, ref: m.ref };
    })
    public member: {
        id: number;
        ref: string;
    };

    @ApiModelPropertyOptional()
    @Allow()
    @Type(() => EventResource)
    @Transform((e: EventResource) => {
        return { id: e.id, ref: e.ref };
    })
    public event: {
        id: number;
        ref: string;
    };

    get prefix(): string {
        return "/attendance";
    }

    public getResourceName(): string {
        return "Attendance";
    }
}
