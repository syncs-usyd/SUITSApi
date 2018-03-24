import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { MembersService } from '../service';
import { Member } from 'entities';
import { MemberDto } from 'api/members/dto';
import { plainToClass, classToPlain } from 'class-transformer';
import { Serializer } from 'utils/Serializer';

@Controller('members')
@UseInterceptors(Serializer(MemberDto))
export class MembersRootController {

    constructor(private readonly membersService: MembersService) {}

    @Get()
    async getAllMembers(): Promise<Member[]> {
        return this.membersService.getAll();
    }

    @Post()
    addMember(@Body() member: MemberDto): Promise<Member> {
        return this.membersService.add(member);
    }
}