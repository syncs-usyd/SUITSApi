import { Member } from "interfaces/member";
import { Attendance } from "interfaces/attendance";

export interface CompleteMember extends Member {

    eventsAttended: Attendance[]
}