import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { Attendance } from "interfaces";

export class AttendanceDto implements Attendance {
    @ApiModelProperty()
    @IsBoolean()
    public primary: boolean;

    @ApiModelProperty()
    @IsNumber()
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
