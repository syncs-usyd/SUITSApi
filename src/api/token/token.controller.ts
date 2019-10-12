import { Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
    ApiImplicitBody,
    ApiOperation,
    ApiResponse,
    ApiUseTags,
} from "@nestjs/swagger";

import { AuthService } from "../../core";

import { CredsDto } from "./creds.dto";
import { TokenResource } from "./token.resource";

@ApiUseTags("authentication")
@Controller("/token")
export class TokenController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard("local"))
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
    @ApiImplicitBody({ name: "CredsDto", type: CredsDto })
    public auth(): TokenResource {
        return { token: this.authService.getToken() };
    }
}
