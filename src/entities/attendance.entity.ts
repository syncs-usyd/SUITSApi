import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

import { IAttendance } from "../interfaces";

import { BaseEntity } from "./base.entity";
import { EventEntity } from "./event.entity";
import { MemberEntity } from "./member.entity";

@Entity({ name: "Attendance" })
@Index(
    "member_event_unique_attendance",
    (a: AttendanceEntity) => [a.member, a.event],
    { unique: true },
)
export class AttendanceEntity extends BaseEntity implements IAttendance {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: "member_id" })
    public memberId: number;

    @Column({ name: "event_id" })
    public eventId: number;

    @ManyToOne(type => MemberEntity, member => member.eventsAttended, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "member_id" })
    public member?: MemberEntity;

    @ManyToOne(type => EventEntity, event => event.membersAttended, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "event_id" })
    public event?: EventEntity;

    @Column()
    public primary: boolean;

    @Column()
    public secondary: number;

    @Column({ nullable: true })
    public additional?: string;

    @Column({ name: "paid_by_card", default: false })
    public paidByCard: boolean;
}
