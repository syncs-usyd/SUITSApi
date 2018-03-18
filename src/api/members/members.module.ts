import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'api/members/member.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Member])],
    controllers: [MembersController],
    components: [MembersService]
})
export class MembersModule {}