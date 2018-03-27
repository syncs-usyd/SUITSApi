import { Module } from '@nestjs/common';
import * as controllers from './controllers';
import { MembersService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from 'entities';
import { AuthModule } from 'api/auth';
import { SerializerModule } from 'serializer';

@Module({
    imports: [TypeOrmModule.forFeature([MemberEntity]), AuthModule],
    controllers: [controllers.MembersIndexController, controllers.MembersIdController],
    components: [MembersService]
})
export class MembersModule {}