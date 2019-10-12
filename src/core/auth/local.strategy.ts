import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: "user", passwordField: "pass" });
    }

    protected validate(username: string, password: string) {
        if (!this.authService.verifyCreds(username, password)) {
            throw new UnauthorizedException();
        }
        return { user: username };
    }
}
