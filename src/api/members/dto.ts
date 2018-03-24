import { Member } from "entities";
import { Gender } from "interfaces/member/gender";

export class MemberDto implements Member {

    email?: string;

    firstName: string;

    lastName: string;

    gender: Gender

    access?: number

    sid?: number

    newsletter: boolean

    doingIT: boolean

}