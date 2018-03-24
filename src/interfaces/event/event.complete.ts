import { Event } from "interfaces/event";
import { Attendance } from "entities";

export interface CompleteEvent extends Event {

    membersAttended: Attendance[]

}