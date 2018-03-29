import { BaseResource } from "resources/resource.base";
import { Attendance } from "interfaces/attendance";
import { MemberResource } from "resources/member";
import { Type, Transform } from "class-transformer";
import { EventResource } from "resources/event/event";
import { Allow, ValidateNested } from "class-validator";

export class AttendanceResource extends BaseResource implements Attendance {

    @Allow()
    id: number;
    
    @Allow()
    primary: boolean;

    @Allow()
    secondary: boolean;
    
    @Allow()
    additional?: string;

    @Allow()
    @Type(() => MemberResource)
    @Transform((m: MemberResource) => {return {id: m.id, ref: m.ref}})
    member: {
        id: number
        ref: string
    }

    @Allow()
    @Type(() => EventResource)
    @Transform((e: EventResource) => {return {id: e.id, ref: e.ref}})
    event: {
        id: number
        ref: string
    }

    get prefix(): string {
        return "/attendance"
    }
    
    getResourceName(): string {
        return "Attendance"
    }
}