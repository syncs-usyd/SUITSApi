import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { MemberDto } from "api/members/members.dto";
import { WebSocketService } from "core";
import { MemberEntity } from "entities";

@Component()
export class MembersService {
    constructor(
        @InjectRepository(MemberEntity)
        private readonly repo: Repository<MemberEntity>,
        private readonly websocket: WebSocketService,
    ) {}

    public async addMember(data: MemberDto): Promise<MemberEntity> {
        const existingMember = await this.getMemberIfExists(data);
        let member: MemberEntity;
        if (data.registered) {
            data.lastJoinedOn = new Date();
        }
        if (existingMember) {
            data.registered = data.registered || existingMember.registered; // disallow unregistering

            member = this.repo.merge(existingMember, data);
            member = await this.repo.save(member);

            this.websocket.sendUpdate(member);
        } else {
            member = this.repo.create(data);
            member = await this.repo.save(member);

            this.websocket.sendInsert(member);
        }

        return member;
    }

    public getAllMembers(): Promise<MemberEntity[]> {
        return this.repo.find();
    }

    public getMember(id: number): Promise<MemberEntity | undefined> {
        return this.repo.findOneById(id, { relations: ["eventsAttended"] });
    }

    public async updateMember(
        id: number,
        data: MemberDto,
    ): Promise<MemberEntity | undefined> {
        let member = await this.repo.findOneById(id);
        if (!member) {
            return undefined;
        }

        member = this.repo.merge(member, data);
        member = await this.repo.save(member);

        this.websocket.sendUpdate(member);
        return member;
    }

    public async deleteMember(id: number): Promise<MemberEntity | undefined> {
        const member = await this.repo.findOneById(id);
        if (!member) {
            return undefined;
        }

        await this.repo.deleteById(id);

        this.websocket.sendDelete(member);
        return member;
    }

    private async getMemberIfExists(
        data: MemberDto,
    ): Promise<MemberEntity | undefined> {
        const validVals = [data.email, data.access, data.sid].filter(v => !!v); // looking for non-falsy value
        if (validVals.length != 0) {
            const fields = {
                email: data.email,
                access: data.access,
                sid: data.sid,
            };

            let q = this.repo.createQueryBuilder("member");
            q = q.select();

            // since we know that one of the following is valid, we don't need to check
            const where = ["email", "access", "sid"].map(
                field =>
                    `(member.${field} IS NOT NULL AND member.${field} = :${field})`,
            );
            q = q.where(where.join(" OR "), fields);

            const result = await q.getOne();

            if (result) {
                return result;
            }
        }
    }
}