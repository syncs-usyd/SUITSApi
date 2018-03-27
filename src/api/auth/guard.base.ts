import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs/Observable";
import { AuthService } from "api/auth/service";

export abstract class AuthGuard<T> implements CanActivate {

    protected abstract authService: AuthService

    abstract getToken(req: T): string

    canActivate(request: T, context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let result = this.authService.verifyToken(this.getToken(request))
        if (!result)
            throw new UnauthorizedException("Authorization token is invalid")

        return true
    }
}