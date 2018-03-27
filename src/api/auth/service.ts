import { AuthDto } from "./dto";
import { verify, sign, JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { Component } from "@nestjs/common";
let config = require('entities/../../config.json');

@Component()
export class AuthService {

    verifyCreds(creds: AuthDto): boolean {

        if (creds.user != config.api.user || creds.pass != config.api.pass)
            return false

        return true
    }

    verifyToken(token: string): boolean {
        try {
            verify(token, config.jwt.secret)
            return true
        }
        catch (err) {
            return false
        }
    }

    getToken(): string {
        return sign({user: config.api.user}, config.jwt.secret, {expiresIn: config.jwt.duration})
    }
}