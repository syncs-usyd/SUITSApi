import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AttendanceEntity } from 'entities';
import { AuthModule } from 'api/auth';

import { AttendanceIndexController } from './attendance.index.controller';
import { AttendanceIdController } from './attendance.id.controller';
import { AttendanceService } from './attendance.service';

@Module({
    imports: [TypeOrmModule.forFeature([AttendanceEntity]), AuthModule],
    controllers: [AttendanceIndexController, AttendanceIdController],
    components: [AttendanceService]
})
export class AttendanceModule {}