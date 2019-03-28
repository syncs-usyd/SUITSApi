import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class AttendanceQuery {
    @ApiModelProperty()
    @Transform((m: string) => Number(m))
    @IsInt()
    public member: number;

    @ApiModelProperty()
    @Transform((e: string) => Number(e))
    @IsInt()
    public event: number;
}

export class OptionalAttendanceQuery {
    @ApiModelPropertyOptional()
    @Transform((m: string) => Number(m))
    @IsOptional()
    @IsInt()
    public member?: number;

    @ApiModelPropertyOptional()
    @Transform((m: string) => Number(m))
    @IsOptional()
    @IsInt()
    public event?: number;
}
