import { Module } from '@nestjs/common';
import { MembersModule } from './members'

@Module({
    imports: [
        MembersModule
    ]
})
export class ApiModule {}
