import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";
import { IAttendance } from "../../interfaces";

export class AttendanceDto implements IAttendance {
    @ApiProperty()
    @IsBoolean()
    public primary: boolean;

    @ApiProperty()
    @IsInt()
    public secondary: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public additional?: string;

    @ApiPropertyOptional({ default: false })
    @IsOptional()
    @IsBoolean()
    public paidByCard?: boolean;
}
