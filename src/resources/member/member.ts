import { BaseResource } from 'resources/resource.base'
import { Member, Gender } from 'interfaces/member'

export class MemberResource extends BaseResource implements Member {

    id: number;

    email?: string;

    firstName: string;
    
    lastName: string;
    
    gender: Gender;

    joinedOn: Date;

    access?: number;

    sid?: number;

    newsletter: boolean;

    doingIT: boolean;

    registered: boolean;

    get prefix() {
        return "/members"
    }

    getResourceName(): string {
        return "Member"
    }
}
