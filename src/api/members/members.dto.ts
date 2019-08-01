import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
} from "class-validator";
import { Gender, IMember } from "../../interfaces";

export class MemberDto implements IMember {
    @ApiModelPropertyOptional()
    @IsOptional()
    @IsEmail()
    public email?: string;

    @ApiModelProperty()
    @IsString()
    public firstName: string;

    @ApiModelProperty()
    @IsString()
    public lastName: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsEnum(Gender)
    public gender?: Gender;

    @ApiModelPropertyOptional()
    @IsOptional()
    public joinedOn?: Date;

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsInt()
    public access?: number;

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsInt()
    public sid?: number;

    @ApiModelPropertyOptional({ default: false })
    @IsOptional()
    @IsBoolean()
    public newsletter?: boolean;

    @ApiModelPropertyOptional({ default: false })
    @IsOptional()
    @IsBoolean()
    public doingIT?: boolean;

    @ApiModelPropertyOptional({ default: false })
    @IsOptional()
    @IsBoolean()
    public registered?: boolean;

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsInt()
    public expectedGradYear?: number;

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsBoolean()
    public international?: boolean;

    @ApiModelPropertyOptional()
    @IsOptional()
    public lastJoinedOn?: Date;
}
