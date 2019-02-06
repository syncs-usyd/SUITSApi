import { Gender } from "./gender.enum";

export interface Member {
    email?: string;

    firstName: string;

    lastName: string;

    gender?: Gender;

    access?: number;

    sid?: number;

    newsletter?: boolean;

    doingIT?: boolean;

    registered?: boolean;

    expectedGradYear?: number;

    international?: boolean;
}
