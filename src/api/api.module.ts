import { Module } from '@nestjs/common';
import { MembersModule } from './members'
import { AttendanceModule } from './attendance';
import { EventModule } from './events'
import { AuthModule } from './auth';
import { WebSocketGuard } from 'api/auth/guard.ws';

@Module({
    imports: [
        AuthModule,
        MembersModule,
        EventModule
    ],
    exports: [AuthModule]
})
export class ApiModule {}
