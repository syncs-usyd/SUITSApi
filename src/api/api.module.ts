import { Module } from '@nestjs/common';
import { MembersModule } from './members'
import { AttendanceModule } from './attendance';
import { EventModule } from './events'
import { AuthModule } from './auth';

@Module({
    imports: [
        AuthModule,
        MembersModule,
        EventModule,
        AttendanceModule
    ],
    exports: [AuthModule]
})
export class ApiModule {}
