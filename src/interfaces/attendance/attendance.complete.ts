import { Attendance } from "interfaces/attendance";
import { Member } from "interfaces/member";
import { Event } from "interfaces/event";

export interface CompleteAttendance extends Attendance {

    member: Member

    event: Event

}