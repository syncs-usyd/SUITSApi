import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AttendanceEntity } from "../../entities";
import { EventsModule } from "../events/events.module";
import { MembersModule } from "../members/members.module";

import { AttendanceService } from ".";
import { AttendanceIdController } from "./attendance.id.controller";
import { AttendanceIndexController } from "./attendance.index.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([AttendanceEntity]),
        MembersModule,
        EventsModule,
    ],
    controllers: [AttendanceIndexController, AttendanceIdController],
    providers: [AttendanceService],
    exports: [AttendanceService],
})
export class AttendanceModule {}
