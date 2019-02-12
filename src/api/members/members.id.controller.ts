import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Put,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiUseTags } from "@nestjs/swagger";

import { SerializerInterceptor } from "core";
import { AuthGuard } from "core";
import { MemberEntity } from "entities";
import { MemberResource } from "resources";

import { MemberDto } from "./members.dto";
import { MembersService } from "./members.service";

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
    public async getMember(@Param("id") id: number): Promise<MemberEntity> {
        const member = await this.membersService.getMember(id);
        if (!member) {
            throw new NotFoundException();
        }

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
    public async editMember(
        @Param("id") id: number,
        @Body(new ValidationPipe({ transform: true })) member: MemberDto,
    ): Promise<MemberEntity> {
        const m = await this.membersService.updateMember(id, member);
        if (!m) {
            throw new NotFoundException();
        }

        return m;
    }

    @Delete()
    @HttpCode(204)
    @ApiOperation({
        title: "Delete a member",
        description:
            "Delete a member and any attendances belonging to that member.",
    })
    public async deleteMember(@Param("id") id: number): Promise<void> {
        const result = await this.membersService.deleteMember(id);
        if (!result) {
            throw new NotFoundException();
        }
    }
}
