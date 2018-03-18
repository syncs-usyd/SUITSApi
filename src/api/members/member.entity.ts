import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'utils/baseentity';

@Entity()
export class Member extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email?: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

}