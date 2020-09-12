import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class AttendanceQuery {
    @ApiProperty()
    @Transform((m: string) => Number(m))
    @IsInt()
    public member: number;

    @ApiProperty()
    @Transform((e: string) => Number(e))
    @IsInt()
    public event: number;
}

export class OptionalAttendanceQuery {
    @ApiPropertyOptional()
    @Transform((m: string) => Number(m))
    @IsOptional()
    @IsInt()
    public member?: number;

    @ApiPropertyOptional()
    @Transform((m: string) => Number(m))
    @IsOptional()
    @IsInt()
    public event?: number;
}
