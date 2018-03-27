import { EventResource } from "resources/event/event";
import { AttendanceResource } from "resources/attendance";
import { Type } from "class-transformer";

export class CompleteEventResource extends EventResource {

    @Type(() => AttendanceResource)
    membersAttended: AttendanceResource[];

}