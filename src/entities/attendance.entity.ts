import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index, IndexOptions, JoinColumn } from 'typeorm';

import { Attendance } from 'interfaces';

import { MemberEntity } from './member.entity'
import { EventEntity } from './event.entity';
import { BaseEntity } from './base.entity';

@Entity({name: "Attendance"})
@Index("member_event_unique_attendance", (a: AttendanceEntity) => [a.member, a.event], {unique : true})
export class AttendanceEntity extends BaseEntity implements Attendance {

    @PrimaryGeneratedColumn()
    id: number

    @Column({name: "member_id"})
    memberId: number

    @Column({name: "event_id"})
    eventId: number

    @ManyToOne(type => MemberEntity, member => member.eventsAttended, {
        eager: true,
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "member_id"})
    member?: MemberEntity

    @ManyToOne(type => EventEntity, event => event.membersAttended, {
        eager: true,
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "event_id"})
    event?: EventEntity

    @Column()
    primary: boolean

    @Column()
    secondary: boolean

    @Column({nullable: true})
    additional?: string

    getType(): new (...args: any[]) => AttendanceEntity {
        return AttendanceEntity
    }

}
