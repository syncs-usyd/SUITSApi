import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index, IndexOptions } from 'typeorm';
import { BaseEntity } from 'utils/baseentity';
import { MemberEntity } from './member'
import { EventEntity } from './event';
import { CompleteAttendance } from 'interfaces/attendance';

@Entity()
@Index("member_event_unique_attendance", (att: AttendanceEntity) => [att.member.id, att.event.id], {unique : true})
export class AttendanceEntity extends BaseEntity implements CompleteAttendance {

    @PrimaryGeneratedColumn()
    id: number

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
