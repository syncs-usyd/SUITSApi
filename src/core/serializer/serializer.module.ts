import { Module } from "@nestjs/common";
import { EntityResourceMapperService } from "./entity-resource-mapper.service";
import { SerializerInterceptor } from "./serializer.interceptor";
import { SerializerService } from "./serializer.service";

@Module({
    exports: [SerializerService, SerializerInterceptor],
    providers: [
        EntityResourceMapperService,
        SerializerService,
        SerializerInterceptor,
    ],
})
export class SerializerModule {}
