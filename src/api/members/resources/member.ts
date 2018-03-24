import { Gender } from "entities/member";
import { BaseResource } from "utils/BaseResource";
import { Exclude } from "class-transformer";

export class MemberResource extends BaseResource {

    @Exclude()
    protected readonly prefix: string = "/members"

    id: number

    email?: string;

    firstName: string;

    lastName: string;

    gender: Gender

    access?: number

    sid?: number

    newsletter: boolean

    doingIT: boolean

}