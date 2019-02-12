import { Module } from "@nestjs/common";
import { AttendanceModule } from "./attendance/attendance.module";
import { EventsModule } from "./events/events.module";
import { MembersModule } from "./members/members.module";
import { TokenModule } from "./token";

@Module({
    imports: [TokenModule, MembersModule, EventsModule, AttendanceModule],
})
export class ApiModule {}
