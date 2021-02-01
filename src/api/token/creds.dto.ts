import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CredsDto {
    @ApiProperty()
    @IsString()
    public user: string;

    @ApiProperty()
    @IsString()
    public pass: string;
}
