import { Module } from '@nestjs/common';
import * as controllers from './controllers';
import { MembersService } from './members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'entities';

@Module({
    imports: [TypeOrmModule.forFeature([Member])],
    controllers: [controllers.MembersRootController, controllers.MembersSingleController],
    components: [MembersService]
})
export class MembersModule {}