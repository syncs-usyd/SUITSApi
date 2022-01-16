import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { WebSocketService } from "../../core";
import { MemberEntity } from "../../entities";
import { MemberDto } from "./members.dto";

@Injectable()
export class MembersService {
    private FIND_MEMBER = ["email", "sid"]
        .map(f => `(member.${f} IS NOT NULL AND member.${f} = :${f})`)
        .join(" OR ");

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
        return this.repo.findOne(id, { relations: ["eventsAttended"] });
    }

    public async updateMember(
        id: number,
        data: MemberDto,
    ): Promise<MemberEntity | undefined> {
        let member = await this.repo.findOne(id);
        if (!member) {
            return undefined;
        }

        member = this.repo.merge(member, data);
        member = await this.repo.save(member);

        this.websocket.sendUpdate(member);
        return member;
    }

    public async deleteMember(id: number): Promise<MemberEntity | undefined> {
        const member = await this.repo.findOne(id);
        if (!member) {
            return undefined;
        }

        await this.repo.delete(id);

        this.websocket.sendDelete(member);
        return member;
    }

    private async getMemberIfExists(
        data: MemberDto,
    ): Promise<MemberEntity | undefined> {
        const validVals = [data.email, data.sid].filter(v => v);
        if (validVals.length != 0) {
            let q = this.repo.createQueryBuilder("member");
            q = q.select();

            // At least one will be not null. Pass through null otherwise.
            q = q.where(this.FIND_MEMBER, {
                email: data.email,
                sid: data.sid,
            });

            return await q.getOne();
        }
    }
}
