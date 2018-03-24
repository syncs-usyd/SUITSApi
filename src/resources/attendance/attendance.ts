import { BaseResource } from "resources/resource.base";
import { Attendance } from "interfaces/attendance";
import { MemberResource } from "resources/member";
import { Type, Transform } from "class-transformer";
import { EventResource } from "resources/event/event";

export class AttendanceResource extends BaseResource implements Attendance {

    id: number;
    
    primary: boolean;

    secondary: boolean;
    
    additional?: string;

    @Type(() => MemberResource)
    @Transform((m: MemberResource) => {return {id: m.id, ref: m.ref}})
    member: {
        id: number
        ref: string
    }

    @Type(() => EventResource)
    @Transform((m: EventResource) => {return {id: m.id, ref: m.ref}})
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