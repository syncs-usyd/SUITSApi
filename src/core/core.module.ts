import { Module, Global } from "@nestjs/common";
import { SerializerModule } from "./serializer/serializer.module";
import { AuthModule } from "./auth/auth.module";
import { WebSocketModule } from "./websocket/websocket.module";

@Global()
@Module({
    imports: [SerializerModule, AuthModule, WebSocketModule],
    exports: [SerializerModule, AuthModule, WebSocketModule]
})
export class CoreModule {}
