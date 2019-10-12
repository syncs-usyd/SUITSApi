import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    private readonly user: string;
    private readonly pass: string;

    constructor(private readonly jwtService: JwtService) {
        const config = require("../../../config.json");
        this.user = config.api.user;
        this.pass = config.api.pass;
    }

    public verifyCreds(username: string, password: string): boolean {
        if (username != this.user || password != this.pass) {
            return false;
        }

        return true;
    }

    public verifyToken(token: string): boolean {
        try {
            this.jwtService.verify(token);
            return true;
        } catch (err) {
            return false;
        }
    }

    public getToken(): string {
        return this.jwtService.sign({ user: this.user });
    }
}
