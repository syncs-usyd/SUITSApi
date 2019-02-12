import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { EventsModule } from "api/events/events.module";
import { MembersModule } from "api/members/members.module";
import { AttendanceEntity } from "entities";

import { AttendanceService } from "api/attendance";
import { AttendanceIdController } from "./attendance.id.controller";
import { AttendanceIndexController } from "./attendance.index.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([AttendanceEntity]),
        MembersModule,
        EventsModule,
    ],
    controllers: [AttendanceIndexController, AttendanceIdController],
    components: [AttendanceService],
    exports: [AttendanceService],
})
export class AttendanceModule {}
