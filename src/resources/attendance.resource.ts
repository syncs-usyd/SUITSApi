import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { Type, Transform } from "class-transformer";
import { Allow, ValidateNested } from "class-validator";

import { Attendance, Member } from "interfaces";

import { BaseResource } from "./base.resource";
import { EventResource } from "./event.resource";
import { MemberResource } from "./member.resource";

export class AttendanceResource extends BaseResource implements Attendance {

    @ApiModelProperty()
    @Allow()
    id: number;
    
    @ApiModelProperty()
    @Allow()
    primary: boolean;

    @ApiModelProperty()
    @Allow()
    secondary: boolean;
    
    @ApiModelPropertyOptional()
    @Allow()
    additional?: string;

    @ApiModelPropertyOptional()
    @Allow()
    @Type(() => MemberResource)
    @Transform((m: MemberResource) => {return {id: m.id, ref: m.ref}})
    member: {
        id: number,
        ref: string
    }

    @ApiModelPropertyOptional()
    @Allow()
    @Type(() => EventResource)
    @Transform((e: EventResource) => {return {id: e.id, ref: e.ref}})
    event: {
        id: number,
        ref: string
    }

    get prefix(): string {
        return "/attendance"
    }
    
    getResourceName(): string {
        return "Attendance"
    }

    getType(): new (...args: any[]) => BaseResource {
        return AttendanceResource
    }
}