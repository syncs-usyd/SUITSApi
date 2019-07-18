import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(protected readonly authService: AuthService) {}

    public canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
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

        return bearerAuth.slice(7);
    }
}
