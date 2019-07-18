import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RavenModule } from "nest-raven";
import { ApiModule } from "./api/api.module";
import { CoreModule } from "./core/core.module";

@Module({
    imports: [TypeOrmModule.forRoot(), CoreModule, ApiModule, RavenModule],
})
export class ApplicationModule {}
