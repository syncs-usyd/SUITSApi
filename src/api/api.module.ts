import { Module } from '@nestjs/common';
import { MembersModule } from './members'
import { AttendanceModule } from './attendance';
import { EventsModule } from './events'
import { AuthModule } from './auth';

@Module({
    imports: [
        AuthModule,
        MembersModule,
        EventsModule,
        AttendanceModule
    ],
})
export class ApiModule {}
