import { Module } from "@nestjs/common";
import { MembersIndexController } from "./members.index.controller";
import { MembersIdController } from "./members.id.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MemberEntity } from "entities";
import { MembersService } from "./members.service";

@Module({
    imports: [TypeOrmModule.forFeature([MemberEntity])],
    controllers: [MembersIndexController, MembersIdController],
    components: [MembersService],
    exports: [MembersService],
})
export class MembersModule {}
