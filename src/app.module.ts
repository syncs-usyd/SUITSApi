import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api';
import { WebSocketService } from './websocket';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ApiModule
  ],
  components: [WebSocketService]
})
export class ApplicationModule {}