import { ApiModelProperty } from "@nestjs/swagger";

export class TokenResource {
    @ApiModelProperty()
    public token: string;
}
