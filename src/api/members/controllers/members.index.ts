import { Controller, Get, Post, Body, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { plainToClass, classToPlain } from 'class-transformer';

import { MemberEntity } from 'entities';
import { Serializer } from 'utils/Serializer';

import { MembersService } from '../service';
import { MemberDto } from '../dto';
import { MemberResource } from 'resources/member';

@Controller(new MemberResource().prefix)
@UseInterceptors(Serializer(MemberResource))
export class MembersIndexController {

    constructor(
        private readonly membersService: MembersService) {}

    @Get()
    async getAllMembers(): Promise<MemberEntity[]> {
        return this.membersService.getAll();
    }

    @Post()
    addMember(@Body(new ValidationPipe({transform: true})) member: MemberDto): Promise<MemberEntity> {
        return this.membersService.add(member);
    }
}