import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Module({
    controllers: [AuthController],
    components: [AuthService, AuthGuard],
    exports: [AuthService, AuthGuard]
})
export class AuthModule {}
