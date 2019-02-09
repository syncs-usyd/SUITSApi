import { Gender } from "./gender.enum";

export interface Member {
    email?: string;

    firstName: string;

    lastName: string;

    gender?: Gender;

    joinedOn?: Date;

    access?: number;

    sid?: number;

    newsletter?: boolean;

    doingIT?: boolean;

    registered?: boolean;

    expectedGradYear?: number;

    international?: boolean;

    lastJoinedOn?: Date;
}
