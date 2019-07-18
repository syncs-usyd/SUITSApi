import { Global, Module } from "@nestjs/common";
import { WebSocketGateway } from "./websocket.gateway";
import { WebSocketService } from "./websocket.service";

@Global()
@Module({
    exports: [WebSocketService],
    providers: [WebSocketGateway, WebSocketService],
})
export class WebSocketModule {}
