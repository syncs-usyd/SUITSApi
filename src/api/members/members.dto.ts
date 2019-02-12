import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
} from "class-validator";
import { Gender, Member } from "interfaces";

export class MemberDto implements Member {
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
    @IsNumber()
    public access?: number;

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsNumber()
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
    @IsNumber()
    public expectedGradYear?: number;

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsBoolean()
    public international?: boolean;

    @ApiModelPropertyOptional()
    @IsOptional()
    public lastJoinedOn?: Date;
}
