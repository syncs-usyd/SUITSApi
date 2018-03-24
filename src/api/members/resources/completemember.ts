import { Event } from "entities";
import { Type } from "class-transformer";
import { AttendanceResource } from "api/attendance/resources/attendance.resource";
import { MemberResource } from "api/members/resources/member";

export class CompleteMemberResource extends MemberResource {

    @Type(() => AttendanceResource)
    eventsAttended: AttendanceResource[]
}