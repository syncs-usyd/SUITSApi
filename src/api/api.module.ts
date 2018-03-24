import { Module } from '@nestjs/common';
import { MembersModule } from './members'
import { AttendanceModule } from './attendance';
import { EventModule } from './events'

@Module({
    imports: [
        MembersModule,
        EventModule,
        AttendanceModule
    ],
})
export class ApiModule {}
