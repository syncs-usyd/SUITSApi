import {
    Body,
    Controller,
    Post,
    UnauthorizedException,
    ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiUseTags } from "@nestjs/swagger";

import { AuthService } from "../../core";

import { CredsDto } from "./creds.dto";
import { TokenResource } from "./token.resource";

@ApiUseTags("authentication")
@Controller("/token")
export class TokenController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    @ApiOperation({
        title: "Retrieve a token",
        description:
            "Retrieves the authentication token to be used as bearer authorization on authorized endpoints.",
    })
    @ApiResponse({
        status: 200,
        type: TokenResource,
    })
    public auth(@Body(new ValidationPipe()) creds: CredsDto): TokenResource {
        if (!this.authService.verifyCreds(creds.user, creds.pass)) {
            throw new UnauthorizedException("Incorrect login details");
        }

        return { token: this.authService.getToken() };
    }
}
