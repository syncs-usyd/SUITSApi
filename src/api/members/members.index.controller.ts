import { Controller, Get, Post, Body, UseInterceptors, ValidationPipe, HttpCode, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { plainToClass, classToPlain } from 'class-transformer';

import { MemberEntity } from 'entities';
import { Serializer } from 'serializer/interceptor';
import { MemberResource } from 'resources/member';
import { AuthGuard } from 'api/auth';

import { MembersService } from './members.service';
import { MemberDto } from './members.dto';

@ApiUseTags("members")
@Controller(new MemberResource().prefix)
@UseInterceptors(Serializer(MemberResource))
export class MembersIndexController {

    constructor(private readonly membersService: MembersService) {}

    @Get()
    @UseGuards(AuthGuard)
    @ApiOperation({
        title: "Retrieve all members",
        description: "Retrieves all members (registered or not) from the system. Does not retrieve the events they attended.",
    })
    @ApiResponse({
        status: 200,
        type: MemberResource,
    })
    getAllMembers(): Promise<MemberEntity[]> {
        return this.membersService.getAllMembers();
    }

    @Post()
    @HttpCode(200)
    @ApiOperation({
        title: "Add a new member",
        description: "This endpoint tries to match the new data to an existing member. If a match is found, the existing member data is updated instead."
    })
    addMember(@Body(new ValidationPipe({transform: true})) member: MemberDto): Promise<MemberEntity> {
        return this.membersService.addMember(member);
    }
}