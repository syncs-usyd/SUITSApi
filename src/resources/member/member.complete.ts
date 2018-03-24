import { Type } from "class-transformer";

import { MemberResource } from "./member";
import { CompleteMember } from "interfaces/member";
import { AttendanceResource } from "resources/attendance";

export class CompleteMemberResource extends MemberResource implements CompleteMember {

    @Type(() => AttendanceResource)
    eventsAttended: AttendanceResource[]
}
