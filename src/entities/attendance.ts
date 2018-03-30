import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index, IndexOptions, JoinColumn } from 'typeorm';
import { MemberEntity } from './member'
import { EventEntity } from './event';
import { Attendance } from 'interfaces/attendance';
import { BaseEntity } from './entity.base';

@Entity({name: "Attendance"})
@Index("member_event_unique_attendance", (att: AttendanceEntity) => [att.memberId, att.eventId], {unique : true})
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

}
