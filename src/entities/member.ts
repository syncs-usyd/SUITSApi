import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AttendanceEntity } from './attendance'
import { Gender } from 'interfaces/member/gender';
import { CompleteMember } from 'interfaces/member';
import { BaseEntity } from 'utils/entity.base';

@Entity()
export class MemberEntity extends BaseEntity implements CompleteMember {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: true})
    email?: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({enum: Gender})
    gender: Gender

    @Column({default: () => "CURRENT_TIMESTAMP"})
    joinedOn: Date

    @Column({unique: true, nullable: true})
    access?: number

    @Column({unique: true, nullable: true})
    sid?: number

    @Column({default: true})
    newsletter: boolean

    @Column({default: false})
    doingIT: boolean

    @Column({default: true})
    registered: boolean

    @OneToMany(type => AttendanceEntity, att => att.member)
    eventsAttended: AttendanceEntity[]

}