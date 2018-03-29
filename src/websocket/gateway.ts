import {
    WebSocketGateway as WSGateway,
    SubscribeMessage,
    WsResponse,
    WebSocketServer,
    WsException,
    OnGatewayConnection,
} from '@nestjs/websockets';
import * as SocketIO from 'socket.io';
import { AuthService } from 'api/auth/service';

@WSGateway()
export class WebSocketGateway implements OnGatewayConnection {

    constructor(private readonly authService: AuthService) {}

    @WebSocketServer() server: SocketIO.Server

    handleConnection(client: SocketIO.Socket) {
        let token = client.handshake.query.token

        /*
        if (!token || !this.authService.verifyToken(token))
            client.disconnect();
            */
    }
}