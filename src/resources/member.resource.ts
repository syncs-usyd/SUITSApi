import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Allow, ValidateNested } from "class-validator";

import { Gender, IMember } from "../interfaces";

import { AttendanceResource } from "./attendance.resource";
import { BaseResource } from "./base.resource";

export class MemberResource extends BaseResource implements IMember {
    @ApiModelProperty()
    @Allow()
    public id: number;

    @ApiModelPropertyOptional()
    @Allow()
    public email?: string;

    @ApiModelProperty()
    @Allow()
    public firstName: string;

    @ApiModelProperty()
    @Allow()
    public lastName: string;

    @ApiModelPropertyOptional()
    @Allow()
    public gender?: Gender;

    @ApiModelProperty() // TODO: look into how to format a date type correctly with nest swagger
    @Allow()
    public joinedOn: Date;

    @ApiModelPropertyOptional()
    @Allow()
    public access?: number;

    @ApiModelPropertyOptional()
    @Allow()
    public sid?: number;

    @ApiModelProperty()
    @Allow()
    public newsletter: boolean;

    @ApiModelProperty()
    @Allow()
    public doingIT: boolean;

    @ApiModelProperty()
    @Allow()
    public registered: boolean;

    @ApiModelPropertyOptional()
    @Allow()
    public expectedGradYear?: number;

    @ApiModelPropertyOptional()
    @Allow()
    public international?: boolean;

    @ApiModelPropertyOptional()
    @Allow()
    public lastJoinedOn?: Date;

    @ApiModelPropertyOptional({ isArray: true, type: AttendanceResource })
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
