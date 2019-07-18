import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MemberEntity } from "../../entities";
import { MembersIdController } from "./members.id.controller";
import { MembersIndexController } from "./members.index.controller";
import { MembersService } from "./members.service";

@Module({
    imports: [TypeOrmModule.forFeature([MemberEntity])],
    controllers: [MembersIndexController, MembersIdController],
    components: [MembersService],
    exports: [MembersService],
})
export class MembersModule {}
