import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiUseTags } from "@nestjs/swagger";
import { RavenInterceptor } from "nest-raven";

import { AuthGuard, SerializerInterceptor } from "../../core";
import { MemberEntity } from "../../entities";
import { MemberResource } from "../../resources";

import { MemberDto } from "./members.dto";
import { MembersService } from "./members.service";

@ApiUseTags("members")
@Controller(new MemberResource().prefix)
@UseInterceptors(SerializerInterceptor)
export class MembersIndexController {
    constructor(private readonly membersService: MembersService) {}

    @Get()
    @UseGuards(AuthGuard)
    @ApiOperation({
        title: "Retrieve all members",
        description:
            "Retrieves all members (registered or not) from the system. Does not retrieve the events they attended.",
    })
    @ApiResponse({
        status: 200,
        type: MemberResource,
    })
    public getAllMembers(): Promise<MemberEntity[]> {
        return this.membersService.getAllMembers();
    }

    @Post()
    @HttpCode(200)
    @UseInterceptors(new RavenInterceptor())
    @ApiOperation({
        title: "Add a new member",
        description:
            "This endpoint tries to match the new data to an existing member. If a match is found, the existing member data is updated instead.",
    })
    public addMember(
        @Body(new ValidationPipe({ transform: true })) member: MemberDto,
    ): Promise<MemberEntity> {
        return this.membersService.addMember(member);
    }
}
