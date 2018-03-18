import {
    WebSocketGateway,
    SubscribeMessage,
    WsResponse,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets';
import * as SocketIO from 'socket.io';

@WebSocketGateway()
export class WebSocketService {
    @WebSocketServer() server: SocketIO.Server;
}