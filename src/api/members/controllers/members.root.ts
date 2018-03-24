import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { plainToClass, classToPlain } from 'class-transformer';

import { MemberEntity } from 'entities';
import { Serializer } from 'utils/Serializer';

import { MembersService } from '../service';
import { MemberDto } from '../dto';
import { MemberResource } from '../resources/member';

@Controller('members')
@UseInterceptors(Serializer(MemberResource))
export class MembersRootController {

    constructor(
        private readonly membersService: MembersService) {}

    @Get()
    async getAllMembers(): Promise<MemberEntity[]> {
        return this.membersService.getAll();
    }

    @Post()
    addMember(@Body() member: MemberDto): Promise<MemberEntity> {
        return this.membersService.add(member);
    }
}