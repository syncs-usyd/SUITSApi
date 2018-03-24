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
        let member: MemberEntity
        let validVals = [data.email, data.access, data.sid].filter(v => !!v) // looking for non-falsy value
        if (validVals.length == 0)
            member = this.repo.create(data);
        else {
            let fields = { email: data.email, access: data.access, sid: data.sid }

            let q = this.repo.createQueryBuilder("member")
            q = q.select()

            // since we know that one of the following is valid, we don't need to check
            if (fields.email)
                q = q.where("member.email IS NOT NULL AND member.email = :email", fields)
            if (fields.access)
                q = q.where("member.access IS NOT NULL AND member.access = :access", fields)
            if (fields.sid)
                q = q.where("member.sid IS NOT NULL AND member.sid = :sid", fields)

            let result = await q.getOne()

            if (result) {
                member = result
                member = this.repo.merge(member, data)
            }
            else
                member = this.repo.create(data)
        }

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