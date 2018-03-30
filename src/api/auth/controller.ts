import { Controller, ValidationPipe, Post, Body, UnauthorizedException } from "@nestjs/common";
import { AuthDto } from "api/auth/dto";
import { AuthService } from "api/auth/service";
import { ApiUseTags, ApiOperation, ApiResponse, ApiModelProperty } from "@nestjs/swagger";

class TokenResource {
    @ApiModelProperty()
    token: string
}

@ApiUseTags('authentication')
@Controller('/token')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post()
    @ApiOperation({
        title: "Retrieve a token",
        description: "Retrieves the authentication token to be used as bearer authorization on authorized endpoints.",
    })
    @ApiResponse({
        status: 200,
        type: TokenResource,
    })
    auth(@Body(new ValidationPipe()) creds: AuthDto): TokenResource {
        if (!this.authService.verifyCreds(creds))
            throw new UnauthorizedException("Incorrect login details")

        return {token: this.authService.getToken()}
    }
}