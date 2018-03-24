import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Member } from 'entities';
import { MemberDto } from './dto';
import { classToPlain, plainToClass } from 'class-transformer';

@Component()
export class MembersService {
    constructor(
        @InjectRepository(Member)
        private readonly repo: Repository<Member>
    ) {}

    async add(member: MemberDto): Promise<Member> {
        // TODO: Business logic
        let m = this.repo.create(member)
        await this.repo.save(m)
        return this.get(m.id);
    }

    getAll(): Promise<Member[]> {
        return this.repo.find()
    }

    get(id: number): Promise<Member> {
        return this.repo.findOneById(id)
    }

    edit(id: number, member: MemberDto): Promise<void> {
        return this.repo.updateById(id, member);
    }

    delete(id: number): Promise<void> {
        return this.repo.deleteById(id);
    }

}