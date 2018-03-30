import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AttendanceEntity } from './attendance'
import { Gender } from 'interfaces/member/gender';
import { Member } from 'interfaces/member';
import { BaseEntity } from './entity.base';

@Entity({name: "Member"})
export class MemberEntity extends BaseEntity implements Member {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: true})
    email?: string;

    @Column({name: "first_name"})
    firstName: string;

    @Column({name: "last_name"})
    lastName: string;

    @Column("enum", {default: Gender.Other})
    gender: Gender

    @Column({name: "joined_on", default: () => "CURRENT_TIMESTAMP", type: "timestamp"})
    joinedOn: Date

    @Column({unique: true, nullable: true})
    access?: number

    @Column({unique: true, nullable: true})
    sid?: number

    @Column({default: true})
    newsletter: boolean

    @Column({name: "doing_it", default: false})
    doingIT: boolean

    @Column({default: true})
    registered: boolean

    @OneToMany(type => AttendanceEntity, att => att.member)
    eventsAttended?: AttendanceEntity[]

}