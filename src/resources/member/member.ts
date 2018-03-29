import { BaseResource } from 'resources/resource.base'
import { Member, Gender } from 'interfaces/member'
import { Allow } from 'class-validator';

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

    get prefix() {
        return "/members"
    }

    getResourceName(): string {
        return "Member"
    }
}
