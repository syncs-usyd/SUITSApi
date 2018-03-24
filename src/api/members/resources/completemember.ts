import { Type } from "class-transformer";
import { MemberResource } from "api/members/resources/member";
import { CompleteMember } from "interfaces/member";
import { AttendanceResource } from "api/attendance/resources/resource";

export class CompleteMemberResource extends MemberResource implements CompleteMember {

    @Type(() => AttendanceResource)
    eventsAttended: AttendanceResource[]
}