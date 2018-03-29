import { EventResource } from "resources/event/event";
import { AttendanceResource } from "resources/attendance";
import { Type } from "class-transformer";
import { Allow, ValidateNested } from "class-validator";

export class CompleteEventResource extends EventResource {

    @Allow()
    @Type(() => AttendanceResource)
    @ValidateNested()
    membersAttended: AttendanceResource[];

}