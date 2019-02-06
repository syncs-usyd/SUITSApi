import { Module } from "@nestjs/common";
import { MembersModule } from "./members/members.module";
import { AttendanceModule } from "./attendance/attendance.module";
import { EventsModule } from "./events/events.module";
import { TokenModule } from "./token";

@Module({
    imports: [TokenModule, MembersModule, EventsModule, AttendanceModule]
})
export class ApiModule {}
