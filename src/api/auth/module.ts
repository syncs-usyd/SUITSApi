import { Module } from '@nestjs/common';
import { AuthController } from './controller';
import { AuthService } from './service';
import { ApiGuard } from 'api/auth/guard.api';
import { WebSocketGuard } from 'api/auth/guard.ws';

@Module({
    controllers: [AuthController],
    components: [AuthService, ApiGuard, WebSocketGuard],
    exports: [AuthService, ApiGuard, WebSocketGuard]
})
export class AuthModule {}
