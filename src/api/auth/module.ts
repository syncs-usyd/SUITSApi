import { Module } from '@nestjs/common';
import { AuthController } from './controller';
import { AuthService } from './service';
import { ApiGuard } from 'api/auth/guard.api';

@Module({
    controllers: [AuthController],
    components: [AuthService, ApiGuard],
    exports: [AuthService, ApiGuard]
})
export class AuthModule {}
