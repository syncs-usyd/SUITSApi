import { Controller, ValidationPipe, Post, Body, UnauthorizedException } from "@nestjs/common";
import { AuthDto } from "api/auth/dto";
import { AuthService } from "api/auth/service";

@Controller('/token')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post()
    auth(@Body(new ValidationPipe()) creds: AuthDto): {token: string} {
        if (!this.authService.verifyCreds(creds))
            throw new UnauthorizedException("Incorrect login details")

        return {token: this.authService.getToken()}
    }
}