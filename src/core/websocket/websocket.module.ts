import { Module, Global } from "@nestjs/common";
import { WebSocketService } from "./websocket.service";
import { WebSocketGateway } from "./websocket.gateway";

@Global()
@Module({
    components: [WebSocketGateway, WebSocketService],
    exports: [WebSocketService]
})
export class WebSocketModule {}
