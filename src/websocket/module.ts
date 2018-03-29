import { Module, Global } from '@nestjs/common';
import { WebSocketService } from './service';
import { AuthModule } from 'api/auth';
import { SerializerService } from 'serializer/service';
import { WebSocketGateway } from './gateway';

@Global()
@Module({
    imports: [AuthModule],
    components: [WebSocketGateway, WebSocketService],
    exports: [WebSocketService]
})
export class WebSocketModule {}