import { IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class AuthDto {

    @ApiModelProperty()
    @IsString()
    user: string 

    @ApiModelProperty()
    @IsString()
    pass: string

}