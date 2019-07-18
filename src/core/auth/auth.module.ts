import { Module } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Module({
    exports: [AuthService, AuthGuard],
    providers: [AuthService, AuthGuard],
})
export class AuthModule {}
