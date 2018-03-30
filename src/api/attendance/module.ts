import { Module } from '@nestjs/common';
import * as controllers from './controllers';
import { AttendanceService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceEntity } from 'entities';
import { AuthModule } from 'api/auth';

@Module({
    imports: [TypeOrmModule.forFeature([AttendanceEntity]), AuthModule],
    controllers: [controllers.AttendanceIndexController, controllers.AttendanceIdController],
    components: [AttendanceService]
})
export class AttendanceModule {}