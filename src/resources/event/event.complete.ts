import { EventResource } from "resources/event/event";
import { CompleteEvent } from "interfaces/event/event.complete";
import { AttendanceResource } from "resources/attendance";
import { Type } from "class-transformer";

export class CompleteEventResource extends EventResource implements CompleteEvent {

    @Type(() => AttendanceResource)
    membersAttended: AttendanceResource[];

}