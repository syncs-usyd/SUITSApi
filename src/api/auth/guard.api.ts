import { AuthGuard } from "api/auth/guard.base";
import { Request } from "express";
import { UnauthorizedException, Guard } from "@nestjs/common";
import { AuthService } from "api/auth/service";

@Guard()
export class ApiGuard extends AuthGuard<Request> {

    constructor(protected readonly authService: AuthService) { super() }

    getToken(req: Request): string {
        let bearerAuth = req.get("Authorization")

        if (!bearerAuth)
            throw new UnauthorizedException("Authorization header is missing")

        if (!bearerAuth.startsWith("Bearer "))
            throw new UnauthorizedException("Bearer prefix is missing from Authorization header.") 

        return bearerAuth.substring(7)
    }
}