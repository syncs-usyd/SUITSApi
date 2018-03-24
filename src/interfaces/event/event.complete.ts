import { Event } from "interfaces/event";
import { Attendance } from "interfaces/attendance";

export interface CompleteEvent extends Event {

    membersAttended: Attendance[]

}