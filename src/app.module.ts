import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiModule } from "./api/api.module";
import { CoreModule } from "./core/core.module";
import { AttendanceEntity, EventEntity, MemberEntity } from "./entities";

@Module({
    imports: [TypeOrmModule.forRoot(), CoreModule, ApiModule],
})
export class ApplicationModule {}
