import { Module } from '@nestjs/common';
import * as controllers from './controllers';
import { AttendanceService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceEntity } from 'entities';

@Module({
    imports: [TypeOrmModule.forFeature([MemberEntity])],
    controllers: [controllers.MembersRootController, controllers.MembersSingleController],
    components: [MembersService]
})
export class MembersModule {}