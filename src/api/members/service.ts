import { Component, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MemberDto } from './dto';
import { MemberEntity } from 'entities/member';
import { WebSocketService } from 'websocket/service';
import { MemberResource } from 'resources/member';
import { BaseEntityService } from 'utils/entity.service.base';

@Component()
export class MembersService extends BaseEntityService<MemberEntity, MemberResource> {

    constructor(
        @InjectRepository(MemberEntity)
        repo: Repository<MemberEntity>,
        websocket: WebSocketService
    ) { super(repo, websocket, MemberResource) }

    private async getMemberIfExists(data: MemberDto): Promise<MemberEntity | undefined> {
        let validVals = [data.email, data.access, data.sid].filter(v => !!v) // looking for non-falsy value
        if (validVals.length != 0) {

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

            if (result) 
                return result
        }
    }

    async addMember(data: MemberDto): Promise<MemberEntity> {
        let existingMember = await this.getMemberIfExists(data)
        let member: MemberEntity
        if (existingMember)
        {
            data.registered = data.registered || existingMember.registered // disallow unregistering
            member = (await this.update(existingMember.id, data))!
        }
        else {
            member = await this.insert(data)
        }

        return member
    }

    getAllMembers(): Promise<MemberEntity[]> {
        return this.repo.find()
    }

    getMember(id: number): Promise<MemberEntity | undefined> {
        return this.repo.findOneById(id, { relations: [ 'eventsAttended' ] })
    }

    updateMember(id: number, data: MemberDto) : Promise<MemberEntity | undefined> {
        return this.update(id, data)
    }

    deleteMember(id: number) : Promise<MemberEntity | undefined> {
        return this.delete(id)
    }

}