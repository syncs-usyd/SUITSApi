import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";
import { IAttendance } from "../../interfaces";

export class AttendanceDto implements IAttendance {
    @ApiModelProperty()
    @IsBoolean()
    public primary: boolean;

    @ApiModelProperty()
    @IsInt()
    public secondary: number;

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsString()
    public additional?: string;

    @ApiModelPropertyOptional({ default: false })
    @IsOptional()
    @IsBoolean()
    public paidByCard?: boolean;
}
