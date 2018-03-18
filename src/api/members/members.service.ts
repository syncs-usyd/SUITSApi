import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Member } from './member.entity';

@Component()
export class MembersService {
    constructor(
        @InjectRepository(Member)
        private readonly repo: Repository<Member>
    ) {}
    
    getAll(): Promise<Member[]> {
        return this.repo.find()
    }

    async add(member: Member): Promise<void> {
        await this.repo.save([member]);
    }
}