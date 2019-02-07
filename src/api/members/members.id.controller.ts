import {
    Controller,
    Get,
    Put,
    Delete,
    Param,
    Body,
    UseInterceptors,
    ValidationPipe,
    NotFoundException,
    HttpCode,
    UseGuards,
} from "@nestjs/common";
import { ApiUseTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

import { MemberEntity } from "entities";
import { SerializerInterceptor } from "core";
import { MemberResource } from "resources";
import { AuthGuard } from "core";

import { MembersService } from "./members.service";
import { MemberDto } from "./members.dto";

@ApiUseTags("members")
@Controller(new MemberResource().prefix + "/:id")
@UseGuards(AuthGuard)
@UseInterceptors(SerializerInterceptor)
export class MembersIdController {
    constructor(private readonly membersService: MembersService) {}

    @Get()
    @ApiOperation({
        title: "Retrieve a member",
        description: "Retrieve a member with a given id.",
    })
    @ApiResponse({
        status: 200,
        type: MemberResource,
    })
    async getMember(@Param("id") id: number): Promise<MemberEntity> {
        let member = await this.membersService.getMember(id);
        if (!member) throw new NotFoundException();

        return member;
    }

    @Put()
    @ApiOperation({
        title: "Update member",
        description: "Update info stored on the member with a given id.",
    })
    @ApiResponse({
        status: 200,
        type: MemberResource,
    })
    async editMember(
        @Param("id") id: number,
        @Body(new ValidationPipe({ transform: true })) member: MemberDto,
    ): Promise<MemberEntity> {
        let m = await this.membersService.updateMember(id, member);
        if (!m) throw new NotFoundException();

        return m;
    }

    @Delete()
    @HttpCode(204)
    @ApiOperation({
        title: "Delete a member",
        description:
            "Delete a member and any attendances belonging to that member.",
    })
    async deleteMember(@Param("id") id: number): Promise<void> {
        let result = await this.membersService.deleteMember(id);
        if (!result) throw new NotFoundException();
    }
}
