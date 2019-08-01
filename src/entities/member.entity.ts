import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { AttendanceEntity } from "./attendance.entity";
import { BaseEntity } from "./base.entity";

import { Gender, IMember } from "../interfaces";

@Entity({ name: "Member" })
export class MemberEntity extends BaseEntity implements IMember {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true, nullable: true })
    public email?: string;

    @Column({ name: "first_name" })
    public firstName: string;

    @Column({ name: "last_name" })
    public lastName: string;

    @Column("enum", { enum: Gender, nullable: true })
    public gender?: Gender;

    @CreateDateColumn({ name: "joined_on" })
    public joinedOn: Date;

    @Column({ unique: true, nullable: true })
    public access?: number;

    @Column({ unique: true, nullable: true })
    public sid?: number;

    @Column({ default: false })
    public newsletter: boolean;

    @Column({ name: "doing_it", default: false })
    public doingIT: boolean;

    @Column({ default: false })
    public registered: boolean;

    @Column({ name: "expected_grad_year", nullable: true })
    public expectedGradYear?: number;

    @Column({ nullable: true })
    public international?: boolean;

    @Column({
        name: "last_joined_on",
        nullable: true,
        type: "timestamp",
    })
    public lastJoinedOn?: Date;

    @OneToMany(type => AttendanceEntity, att => att.member)
    public eventsAttended?: AttendanceEntity[];

    public getType(): new (...args: any[]) => MemberEntity {
        return MemberEntity;
    }
}
