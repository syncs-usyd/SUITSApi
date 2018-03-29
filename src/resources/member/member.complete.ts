import { Type } from "class-transformer";

import { MemberResource } from "./member";
import { AttendanceResource } from "resources/attendance";
import { Allow, ValidateNested } from "class-validator";

export class CompleteMemberResource extends MemberResource {

    @Allow()
    @Type(() => AttendanceResource)
    @ValidateNested()
    eventsAttended: AttendanceResource[]
}
