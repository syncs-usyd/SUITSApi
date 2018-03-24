import { Module } from '@nestjs/common';
import { WebSocketService } from './websocket.service';

@Module({
    components: [WebSocketService]
})
export class WebSocketModule {}