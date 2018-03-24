import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AttendanceEntity } from './attendance';
import { CompleteEvent } from 'interfaces/event/event.complete';
import { BaseEntity } from './entity.base';

@Entity({name: "Event"})
export class EventEntity extends BaseEntity implements CompleteEvent {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({nullable: true})
    description?: string

    @Column({type: Date})
    time: Date

    @OneToMany(type => AttendanceEntity, att => att.event)
    membersAttended: AttendanceEntity[]

}