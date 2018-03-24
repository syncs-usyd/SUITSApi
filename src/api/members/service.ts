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

    async add(data: MemberDto): Promise<MemberEntity> {
        // TODO: Business logic
        let member = this.repo.create(data)
        await this.repo.save(member)
        return this.repo.findOneById(member.id)
    }

    getAll(): Promise<MemberEntity[]> {
        return this.repo.find()
    }

    get(id: number): Promise<MemberEntity> {
        return this.repo.findOneById(id, { relations: [ 'eventsAttended' ] })
    }

    async edit(id: number, data: MemberDto): Promise<void> {
        let member = await this.get(id)
        member = this.repo.merge(member, data)
        await this.repo.save(member)
    }

    async delete(id: number): Promise<void> {
        let member = await this.get(id)
        await this.repo.remove(member)
    }

}