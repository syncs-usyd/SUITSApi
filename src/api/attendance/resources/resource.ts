import { BaseResource } from "utils/resource.base";
import { Attendance } from "interfaces/attendance";
import { MemberResource } from "api/members/resources/member";
import { Type } from "class-transformer";

export class AttendanceResource extends BaseResource implements Attendance {

    protected readonly prefix: string = "/attendance"
    
    id: number;
    
    primary: boolean;

    secondary: boolean;
    
    additional?: string;

    @Type(() => MemberResource)
    member: {
        id: number
        ref: string
    }

    event: {
        id: number
        ref: string
    }
    
    getResourceName(): string {
        return "Member"
    }
}