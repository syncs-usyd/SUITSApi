import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MemberDto } from './dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { MemberEntity } from 'entities/member';

@Component()
export class MembersService {
    constructor(
        @InjectRepository(MemberEntity)
        private readonly repo: Repository<MemberEntity>
    ) {}

    async add(member: MemberDto): Promise<MemberEntity> {
        // TODO: Business logic
        let m = this.repo.create(member)
        await this.repo.save(m)
        return this.repo.findOneById(m.id)
    }

    getAll(): Promise<MemberEntity[]> {
        return this.repo.find()
    }

    get(id: number): Promise<MemberEntity> {
        return this.repo.findOneById(id, { relations: [ 'eventsAttended' ] })
    }

    async edit(id: number, member: MemberDto): Promise<void> {
        this.repo.updateById(id, member)
    }

    async delete(id: number): Promise<void> {
        this.repo.deleteById(id)
    }

}