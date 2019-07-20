import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RavenModule } from "nest-raven";
import { ApiModule } from "./api/api.module";
import { CoreModule } from "./core/core.module";
import { AttendanceEntity, EventEntity, MemberEntity } from "./entities";

const ormconfig = require("../ormconfig.json");

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...ormconfig,
            entities: [AttendanceEntity, EventEntity, MemberEntity],
        }),
        CoreModule,
        ApiModule,
        RavenModule,
    ],
})
export class ApplicationModule {}
