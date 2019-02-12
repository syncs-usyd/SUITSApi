import { ApiModelProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CredsDto {
    @ApiModelProperty()
    @IsString()
    public user: string;

    @ApiModelProperty()
    @IsString()
    public pass: string;
}
