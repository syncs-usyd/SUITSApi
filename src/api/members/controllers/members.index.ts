import { Controller, Get, Post, Body, UseInterceptors, ValidationPipe, HttpCode } from '@nestjs/common';
import { plainToClass, classToPlain } from 'class-transformer';

import { MemberEntity } from 'entities';
import { Serializer } from 'serializer/interceptor';

import { MembersService } from '../service';
import { MemberDto } from '../dto';
import { MemberResource } from 'resources/member';

@Controller(new MemberResource().prefix)
@UseInterceptors(Serializer(MemberResource))
export class MembersIndexController {

    constructor(private readonly membersService: MembersService) {}

    @Get()
    async getAllMembers(): Promise<MemberEntity[]> {
        return this.membersService.getAllMembers();
    }

    @Post()
    @HttpCode(200)
    addMember(@Body(new ValidationPipe({transform: true})) member: MemberDto): Promise<MemberEntity> {
        return this.membersService.addMember(member);
    }
}