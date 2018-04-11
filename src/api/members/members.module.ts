import { Module } from '@nestjs/common';
import { MembersIndexController } from './members.index.controller'
import { MembersIdController } from './members.id.controller'
import { MembersService } from './members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from 'entities';
import { AuthModule } from 'api/auth';
import { SerializerModule } from 'serializer';

@Module({
    imports: [TypeOrmModule.forFeature([MemberEntity]), AuthModule],
    controllers: [MembersIndexController, MembersIdController],
    components: [MembersService]
})
export class MembersModule {}