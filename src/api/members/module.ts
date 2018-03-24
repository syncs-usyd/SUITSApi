import { Module } from '@nestjs/common';
import * as controllers from './controllers';
import { MembersService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from 'entities';

@Module({
    imports: [TypeOrmModule.forFeature([MemberEntity])],
    controllers: [controllers.MembersIndexController, controllers.MembersIdController],
    components: [MembersService]
})
export class MembersModule {}