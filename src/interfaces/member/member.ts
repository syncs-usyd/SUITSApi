import { Gender } from "interfaces/member/gender";

export interface Member {
 
    email?: string;

    firstName: string;

    lastName: string;

    gender: Gender

    joinedOn: Date

    access?: number

    sid?: number

    newsletter: boolean

    doingIT: boolean
   
}