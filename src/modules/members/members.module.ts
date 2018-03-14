import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';

@Module({
    controllers: [MembersController],
    components: [MembersService],
})
export class MembersModule {}