import { BaseResource } from "utils/resource.base";
import { Gender } from "interfaces/member/gender";
import { Member } from "interfaces/member";

export class MemberResource extends BaseResource implements Member {

    protected readonly prefix: string = "/members"

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

    getResourceName(): string {
        return "Member"
    }
}