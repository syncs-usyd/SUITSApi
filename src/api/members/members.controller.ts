import { Controller, Get } from '@nestjs/common';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {

    constructor(private readonly membersService: MembersService) {}

    @Get()
    getAllMembers(): any[] {
        return this.membersService.getAll()
    }
}