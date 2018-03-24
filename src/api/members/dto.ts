import { Gender } from "interfaces/member/gender";
import { Member } from "interfaces/member";

export class MemberDto implements Member {

    email?: string;

    firstName: string;

    lastName: string;

    gender: Gender

    joinedOn: Date;

    access?: number

    sid?: number

    newsletter: boolean

    doingIT: boolean

    registered: boolean;

}