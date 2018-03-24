import { Controller, Get, Put, Delete, Param, Body, UseInterceptors, ValidationPipe, NotFoundException, HttpCode } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { MemberEntity } from 'entities';
import { Serializer } from 'utils/Serializer';
import { CompleteMemberResource } from 'resources/member';

import { MembersService } from '../service';
import { MemberDto } from '../dto';

@Controller(new CompleteMemberResource().prefix+"/:id")
@UseInterceptors(Serializer(CompleteMemberResource))
export class MembersIdController {
    
    constructor(private readonly membersService: MembersService) {}

    @Get()
    async getMember(@Param('id') id: number) : Promise<MemberEntity> {
        let member = await this.membersService.get(id)
        if (!member)
            throw new NotFoundException()
        
        return member;
    }

    @Put()
    @HttpCode(204)
    editMember(@Param('id') id: number, @Body(new ValidationPipe({transform: true})) member: MemberDto) : Promise<void> {
        return this.membersService.edit(id, member);
    }

    @Delete()
    @HttpCode(204)
    deleteMember(@Param('id') id: number) : Promise<void> {
        return this.membersService.delete(id);
    }

}
