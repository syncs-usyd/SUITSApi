import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AttendanceEntity } from 'entities';
import { MembersModule } from 'api/members/members.module';
import { EventsModule } from 'api/events/events.module';

import { AttendanceIndexController } from './attendance.index.controller';
import { AttendanceIdController } from './attendance.id.controller';
import { AttendanceService } from 'api/attendance';

@Module({
    imports: [TypeOrmModule.forFeature([AttendanceEntity]), MembersModule, EventsModule],
    controllers: [AttendanceIndexController, AttendanceIdController],
    components: [AttendanceService],
    exports: [AttendanceService]
})
export class AttendanceModule {}