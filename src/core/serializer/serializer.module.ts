import { Module } from '@nestjs/common';
import { SerializerService } from './serializer.service';
import { SerializerInterceptor } from './serializer.interceptor';
import { EntityResourceMapperService } from './entity-resource-mapper.service';

@Module({
    components: [EntityResourceMapperService, SerializerService, SerializerInterceptor],
    exports: [SerializerService, SerializerInterceptor]
})
export class SerializerModule {}

