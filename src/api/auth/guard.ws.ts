import { AuthGuard } from "api/auth/guard.base";
import { AuthService } from "api/auth/service";
import { Guard } from "@nestjs/common";

@Guard()
export class WebSocketGuard extends AuthGuard<any> {
    constructor(protected readonly authService: AuthService) { super() }

    getToken(req: any): string {
        console.log(req)
        throw new Error("Method not implemented.");
    }
}