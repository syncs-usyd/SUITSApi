import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index, IndexOptions } from 'typeorm';
import { MemberEntity } from './member'
import { EventEntity } from './event';
import { CompleteAttendance } from 'interfaces/attendance';
import { BaseEntity } from 'utils/entity.base';

@Entity()
@Index("member_event_unique_attendance", (att: AttendanceEntity) => [att.memberId, att.eventId], {unique : true})
export class AttendanceEntity extends BaseEntity implements CompleteAttendance {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    memberId: number

    @Column()
    eventId: number

    @ManyToOne(type => MemberEntity, member => member.eventsAttended, {
        onDelete: "CASCADE"
    })
    member: MemberEntity

    @ManyToOne(type => EventEntity, event => event.membersAttended, {
        onDelete: "CASCADE"
    })
    event: EventEntity

    @Column()
    primary: boolean

    @Column()
    secondary: boolean

    @Column({nullable: true})
    additional?: string

}
