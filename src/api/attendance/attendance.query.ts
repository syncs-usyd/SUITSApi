import { Transform } from "class-transformer";
import { ApiModelPropertyOptional, ApiModelProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class AttendanceQuery {

    @ApiModelProperty()
    @Transform((m: string) => Number(m))
    @IsNumber()
    member: number

    @ApiModelProperty()
    @Transform((e: string) => Number(e))
    @IsNumber()
    event: number
}

export class OptionalAttendanceQuery {

    @ApiModelPropertyOptional()
    @Transform((m: string) => Number(m))
    @IsOptional()
    @IsNumber()
    member: number

    @ApiModelPropertyOptional()
    @Transform((m: string) => Number(m))
    @IsOptional()
    @IsNumber()
    event: number
}
