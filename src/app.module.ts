import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api';
import { WebSocketModule } from './websocket';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    WebSocketModule,
    ApiModule
  ],
})
export class ApplicationModule {}