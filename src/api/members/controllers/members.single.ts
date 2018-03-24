import { Controller, Get, Put, Delete, Param, Body, UseInterceptors } from '@nestjs/common';
import { MembersService } from '../service';
import { MemberEntity } from 'entities';
import { MemberDto } from '../dto';
import { Serializer } from 'utils/Serializer';
import { CompleteMemberResource } from '../resources/completemember';
import { plainToClass } from 'class-transformer';

@Controller('members/:id')
@UseInterceptors(Serializer(CompleteMemberResource))
export class MembersSingleController {
    
    constructor(private readonly membersService: MembersService) {}

    @Get()
    async getMember(@Param('id') id: number) : Promise<MemberEntity> {
        return this.membersService.get(id)
    }

    @Put()
    editMember(@Param('id') id: number, @Body() member: MemberDto) : Promise<void> {
        return this.membersService.edit(id, member);
    }

    @Delete()
    deleteMember(@Param('id') id: number) : Promise<void> {
        return this.membersService.delete(id);
    }

}
