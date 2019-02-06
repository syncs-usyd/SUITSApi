import {
    ApiUseTags,
    ApiOperation,
    ApiResponse,
    ApiModelProperty
} from "@nestjs/swagger";
import {
    Controller,
    ValidationPipe,
    Post,
    Body,
    UnauthorizedException
} from "@nestjs/common";

import { AuthService } from "core";

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
            "Retrieves the authentication token to be used as bearer authorization on authorized endpoints."
    })
    @ApiResponse({
        status: 200,
        type: TokenResource
    })
    auth(@Body(new ValidationPipe()) creds: CredsDto): TokenResource {
        if (!this.authService.verifyCreds(creds.user, creds.pass))
            throw new UnauthorizedException("Incorrect login details");

        return { token: this.authService.getToken() };
    }
}
