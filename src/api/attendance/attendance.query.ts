import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class AttendanceQuery {
    @ApiModelProperty()
    @Transform((m: string) => Number(m))
    @IsNumber()
    public member: number;

    @ApiModelProperty()
    @Transform((e: string) => Number(e))
    @IsNumber()
    public event: number;
}

export class OptionalAttendanceQuery {
    @ApiModelPropertyOptional()
    @Transform((m: string) => Number(m))
    @IsOptional()
    @IsNumber()
    public member?: number;

    @ApiModelPropertyOptional()
    @Transform((m: string) => Number(m))
    @IsOptional()
    @IsNumber()
    public event?: number;
}
