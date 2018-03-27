import { Type } from "class-transformer";

import { MemberResource } from "./member";
import { AttendanceResource } from "resources/attendance";

export class CompleteMemberResource extends MemberResource {

    @Type(() => AttendanceResource)
    eventsAttended: AttendanceResource[]
}
