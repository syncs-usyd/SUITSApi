import { Module } from "@nestjs/common";
import { EntityResourceMapperService } from "./entity-resource-mapper.service";
import { SerializerInterceptor } from "./serializer.interceptor";
import { SerializerService } from "./serializer.service";

@Module({
    components: [
        EntityResourceMapperService,
        SerializerService,
        SerializerInterceptor,
    ],
    exports: [SerializerService, SerializerInterceptor],
})
export class SerializerModule {}
