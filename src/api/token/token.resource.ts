import { ApiModelProperty } from "@nestjs/swagger";

export class TokenResource {
    @ApiModelProperty()
    token: string;
}
