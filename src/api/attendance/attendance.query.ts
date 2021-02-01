import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class AttendanceQuery {
    @ApiProperty()
    @Transform(({ value }) => Number(value))
    @IsInt()
    public member: number;

    @ApiProperty()
    @Transform(({ value }) => Number(value))
    @IsInt()
    public event: number;
}

export class OptionalAttendanceQuery {
    @ApiPropertyOptional()
    @Transform(({ value }) => Number(value))
    @IsOptional()
    @IsInt()
    public member?: number;

    @ApiPropertyOptional()
    @Transform(({ value }) => Number(value))
    @IsOptional()
    @IsInt()
    public event?: number;
}
