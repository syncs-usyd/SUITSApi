import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

// tslint:disable-next-line: no-var-requires
const config = require("../../../config.json");

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: config.jwt.secret,
            signOptions: {
                audience: config.jwt.audience,
                expiresIn: config.jwt.duration,
            },
        }),
    ],
    exports: [AuthService],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
