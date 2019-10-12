import { AuthGuard as PassportAuthGuard } from "@nestjs/passport";
export { AuthService } from "./auth.service";

export const AuthGuard = PassportAuthGuard("jwt");
