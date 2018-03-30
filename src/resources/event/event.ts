import { Event } from "interfaces/event";
import { BaseResource } from "resources/resource.base";
import { Allow, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { AttendanceResource } from "resources/attendance";

export class EventResource extends BaseResource implements Event {

    @Allow()
    id: number;

    @Allow()
    title: string;

    @Allow()
    description?: string;

    @Allow()
    time: Date;

    @Type(() => AttendanceResource)
    @ValidateNested()
    membersAttended?: AttendanceResource[];

    get prefix(): string {
        return '/events'
    }

    getResourceName(): string {
        return "Event"
    }
}