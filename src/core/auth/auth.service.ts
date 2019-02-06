import {
    verify,
    sign,
    JsonWebTokenError,
    TokenExpiredError
} from "jsonwebtoken";
import { Component } from "@nestjs/common";

let config = require("entities/../../config.json");

@Component()
export class AuthService {
    verifyCreds(username: string, password: string): boolean {
        if (username != config.api.user || password != config.api.pass)
            return false;

        return true;
    }

    verifyToken(token: string): boolean {
        try {
            verify(token, config.jwt.secret);
            return true;
        } catch (err) {
            return false;
        }
    }

    getToken(): string {
        return sign({ user: config.api.user }, config.jwt.secret, {
            expiresIn: config.jwt.duration
        });
    }
}
