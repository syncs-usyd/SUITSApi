import {
    CanActivate,
    ExecutionContext,
    Guard,
    UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs/Observable";

import { AuthService } from "./auth.service";

@Guard()
export class AuthGuard implements CanActivate {
    constructor(protected readonly authService: AuthService) {}

    public canActivate(
        request: Request,
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const result = this.authService.verifyToken(this.getToken(request));
        if (!result) {
            throw new UnauthorizedException("Authorization token is invalid");
        }

        return true;
    }

    public getToken(req: Request): string {
        const bearerAuth = req.get("Authorization");

        if (!bearerAuth) {
            throw new UnauthorizedException("Authorization header is missing");
        }

        if (!bearerAuth.startsWith("Bearer ")) {
            throw new UnauthorizedException(
                "Bearer prefix is missing from Authorization header.",
            );
        }

        return bearerAuth.substring(7);
    }
}
