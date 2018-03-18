import { Controller, Get, Post } from '@nestjs/common';
import { MembersService } from './members.service';
import { Member } from 'api/members/member.entity';

@Controller('members')
export class MembersController {

    constructor(private readonly membersService: MembersService) {}

    @Get()
    getAllMembers(): Promise<any[]> {
        return this.membersService.getAll()
    }

    @Post()
    addMember(): void {
    }
}