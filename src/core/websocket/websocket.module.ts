import { Global, Module } from "@nestjs/common";
import { WebSocketGateway } from "./websocket.gateway";
import { WebSocketService } from "./websocket.service";

@Global()
@Module({
    components: [WebSocketGateway, WebSocketService],
    exports: [WebSocketService],
})
export class WebSocketModule {}
