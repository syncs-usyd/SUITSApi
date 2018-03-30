import { ApiModelProperty } from "@nestjs/swagger";

export class RefResource {

    @ApiModelProperty()
    id: number

    @ApiModelProperty()
    ref: string
}