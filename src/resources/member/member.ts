import { BaseResource } from 'resources/resource.base'
import { Member, Gender } from 'interfaces/member'
import { Allow, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { AttendanceResource } from 'resources/attendance';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class MemberResource extends BaseResource implements Member {

    @ApiModelProperty()
    @Allow()
    id: number;

    @ApiModelPropertyOptional()
    @Allow()
    email?: string;

    @ApiModelProperty()
    @Allow()
    firstName: string;
    
    @ApiModelProperty()
    @Allow()
    lastName: string;
    
    @ApiModelProperty()
    @Allow()
    gender: Gender;

    @ApiModelProperty() // TODO: look into how to format a date type correctly with nest swagger
    @Allow()
    joinedOn: Date;

    @ApiModelPropertyOptional()
    @Allow()
    access?: number;

    @ApiModelPropertyOptional()
    @Allow()
    sid?: number;

    @ApiModelProperty()
    @Allow()
    newsletter: boolean;

    @ApiModelProperty()
    @Allow()
    doingIT: boolean;

    @ApiModelProperty()
    @Allow()
    registered: boolean;

    @ApiModelPropertyOptional({isArray: true, type: AttendanceResource})
    @Type(() => AttendanceResource)
    @ValidateNested()
    eventsAttended?: AttendanceResource[]

    get prefix() {
        return "/members"
    }

    getResourceName(): string {
        return "Member"
    }
}
