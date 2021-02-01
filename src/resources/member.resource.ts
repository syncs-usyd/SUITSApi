import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Allow, ValidateNested } from "class-validator";

import { Gender, IMember } from "../interfaces";

import { AttendanceResource } from "./attendance.resource";
import { BaseResource } from "./base.resource";

export class MemberResource extends BaseResource implements IMember {
    @ApiProperty()
    @Allow()
    public id: number;

    @ApiPropertyOptional()
    @Allow()
    public email?: string;

    @ApiProperty()
    @Allow()
    public firstName: string;

    @ApiProperty()
    @Allow()
    public lastName: string;

    @ApiPropertyOptional()
    @Allow()
    public gender?: Gender;

    @ApiProperty() // TODO: look into how to format a date type correctly with nest swagger
    @Allow()
    public joinedOn: Date;

    @ApiPropertyOptional()
    @Allow()
    public access?: number;

    @ApiPropertyOptional()
    @Allow()
    public sid?: number;

    @ApiProperty()
    @Allow()
    public newsletter: boolean;

    @ApiProperty()
    @Allow()
    public doingIT: boolean;

    @ApiProperty()
    @Allow()
    public registered: boolean;

    @ApiPropertyOptional()
    @Allow()
    public expectedGradYear?: number;

    @ApiPropertyOptional()
    @Allow()
    public international?: boolean;

    @ApiPropertyOptional()
    @Allow()
    public lastJoinedOn?: Date;

    @ApiPropertyOptional({ isArray: true, type: AttendanceResource })
    @Type(() => AttendanceResource)
    @ValidateNested()
    public eventsAttended?: AttendanceResource[];

    get prefix() {
        return "/members";
    }

    public getResourceName(): string {
        return "Member";
    }
}
