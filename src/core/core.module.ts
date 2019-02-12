import { Global, Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { SerializerModule } from "./serializer/serializer.module";
import { WebSocketModule } from "./websocket/websocket.module";

@Global()
@Module({
    imports: [SerializerModule, AuthModule, WebSocketModule],
    exports: [SerializerModule, AuthModule, WebSocketModule],
})
export class CoreModule {}
