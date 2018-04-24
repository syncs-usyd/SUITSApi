import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Event } from 'interfaces';

import { AttendanceEntity } from './attendance.entity';
import { BaseEntity } from './base.entity';

@Entity({name: "Event"})
export class EventEntity extends BaseEntity implements Event {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({nullable: true})
    description?: string

    @Column({nullable: false, type: "timestamp"})
    time: Date

    @OneToMany(type => AttendanceEntity, att => att.event)
    membersAttended?: AttendanceEntity[]

    getType(): new (...args: any[]) => EventEntity {
        return EventEntity
    }

}
