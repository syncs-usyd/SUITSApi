import { Module } from '@nestjs/common';
import * as controllers from './controllers';
import { AttendanceService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceEntity } from 'entities';

@Module({
    imports: [TypeOrmModule.forFeature([AttendanceEntity])],
    controllers: [controllers.AttendanceIndexController, controllers.AttendanceIdController],
    components: [AttendanceService]
})
export class AttendanceModule {}