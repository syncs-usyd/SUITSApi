import { BaseResource } from "resources/resource.base";
import { Attendance } from "interfaces/attendance";
import { MemberResource } from "resources/member";
import { Type, Transform } from "class-transformer";
import { EventResource } from "resources/event/event";
import { Allow, ValidateNested } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { RefResource } from "resources/resource.ref";
import { Member } from "interfaces/member";

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
    member: RefResource

    @ApiModelPropertyOptional()
    @Allow()
    @Type(() => EventResource)
    @Transform((e: EventResource) => {return {id: e.id, ref: e.ref}})
    event: RefResource

    get prefix(): string {
        return "/attendance"
    }
    
    getResourceName(): string {
        return "Attendance"
    }
}