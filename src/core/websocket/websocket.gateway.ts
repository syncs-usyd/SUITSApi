import {
    OnGatewayConnection,
    WebSocketGateway as WSGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import * as SocketIO from "socket.io";

import { AuthService } from "core";

@WSGateway()
export class WebSocketGateway implements OnGatewayConnection {
    @WebSocketServer()
    public server: SocketIO.Server;
    constructor(private readonly authService: AuthService) {}

    public handleConnection(client: SocketIO.Socket) {
        const token = client.handshake.query.token;

        if (!token || !this.authService.verifyToken(token)) {
            client.disconnect();
        }
    }
}
