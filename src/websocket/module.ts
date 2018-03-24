import { Module } from '@nestjs/common';
import { WebSocketService } from './service';

@Module({
    components: [WebSocketService]
})
export class WebSocketModule {}