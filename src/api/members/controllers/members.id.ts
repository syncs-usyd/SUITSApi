import { Controller, Get, Put, Delete, Param, Body, UseInterceptors, ValidationPipe, NotFoundException, HttpCode, UseGuards, NestInterceptor, ExecutionContext, Interceptor } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { MemberEntity } from 'entities';
import { Serializer } from 'serializer/interceptor';
import { MemberResource } from 'resources/member';

import { MembersService } from '../service';
import { MemberDto } from '../dto';
import { ApiGuard } from 'api/auth/guard.api';

@Controller(new MemberResource().prefix+"/:id")
@UseInterceptors(Serializer(MemberResource))
export class MembersIdController {
    
    constructor(private readonly membersService: MembersService) {}

    @Get()
    async getMember(@Param('id') id: number) : Promise<MemberEntity> {
        let member = await this.membersService.getMember(id)
        if (!member)
            throw new NotFoundException

        return member
    }

    @Put()
    async editMember(@Param('id') id: number, @Body(new ValidationPipe({transform: true})) member: MemberDto) : Promise<MemberEntity> {
        let m = await this.membersService.updateMember(id, member);
        if (!m)
            throw new NotFoundException
        
        return m
    }

    @Delete()
    @HttpCode(204)
    async deleteMember(@Param('id') id: number) : Promise<void> {
        let result = await this.membersService.deleteMember(id);
        if (!result)
            throw new NotFoundException
    }

}
