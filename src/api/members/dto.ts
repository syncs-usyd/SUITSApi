import { Member, Gender } from "interfaces/member";
import { IsEmail, IsString, IsEnum, IsNumber, IsBoolean, Validate, IsOptional } from "class-validator";

export class MemberDto implements Member {

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender

    @IsOptional()
    @IsNumber()
    access?: number

    @IsOptional()
    @IsNumber()
    sid?: number

    @IsOptional()
    @IsBoolean()
    newsletter?: boolean

    @IsOptional()
    @IsBoolean()
    doingIT?: boolean

    @IsOptional()
    @IsBoolean()
    registered?: boolean;
}