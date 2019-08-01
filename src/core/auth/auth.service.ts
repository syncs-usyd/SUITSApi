import { Injectable } from "@nestjs/common";
import { sign, verify } from "jsonwebtoken";

// tslint:disable-next-line: no-var-requires
const config = require("../../../config.json");

@Injectable()
export class AuthService {
    public verifyCreds(username: string, password: string): boolean {
        if (username != config.api.user || password != config.api.pass) {
            return false;
        }

        return true;
    }

    public verifyToken(token: string): boolean {
        try {
            verify(token, config.jwt.secret);
            return true;
        } catch (err) {
            return false;
        }
    }

    public getToken(): string {
        return sign({ user: config.api.user }, config.jwt.secret, {
            expiresIn: config.jwt.duration,
        });
    }
}
