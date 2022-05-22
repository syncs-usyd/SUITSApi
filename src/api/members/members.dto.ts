import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
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
    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    public email?: string;

    @ApiProperty()
    @IsString()
    public firstName: string;

    @ApiProperty()
    @IsString()
    public lastName: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(Gender)
    public gender?: Gender;

    @ApiPropertyOptional()
    @IsOptional()
    public joinedOn?: Date;

    @ApiProperty()
    @IsInt()
    public sid: number;

    @ApiPropertyOptional({ default: false })
    @IsOptional()
    @IsBoolean()
    public newsletter?: boolean;

    @ApiPropertyOptional({ default: false })
    @IsOptional()
    @IsBoolean()
    public doingIT?: boolean;

    @ApiPropertyOptional({ default: false })
    @IsOptional()
    @IsBoolean()
    public registered?: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    public expectedGradYear?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    public international?: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    public lastJoinedOn?: Date;
}
