import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api';
import { WebSocketModule } from './websocket';
import { SerializerModule } from 'serializer';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ApiModule,

    SerializerModule,
    WebSocketModule
  ],
})
export class ApplicationModule {}