import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AttendanceEntity } from './attendance';
import { Event } from 'interfaces/event';
import { BaseEntity } from './entity.base';

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

}
