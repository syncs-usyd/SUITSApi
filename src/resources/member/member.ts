import { BaseResource } from 'resources/resource.base'
import { Member, Gender } from 'interfaces/member'
import { Allow, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { AttendanceResource } from 'resources/attendance';

export class MemberResource extends BaseResource implements Member {

    @Allow()
    id: number;

    @Allow()
    email?: string;

    @Allow()
    firstName: string;
    
    @Allow()
    lastName: string;
    
    @Allow()
    gender: Gender;

    @Allow()
    joinedOn: Date;

    @Allow()
    access?: number;

    @Allow()
    sid?: number;

    @Allow()
    newsletter: boolean;

    @Allow()
    doingIT: boolean;

    @Allow()
    registered: boolean;

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
