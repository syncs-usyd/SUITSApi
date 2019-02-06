import { Attendance } from "interfaces";
import { IsBoolean, IsOptional, IsString, IsNumber } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class AttendanceDto implements Attendance {

    @ApiModelProperty()
    @IsBoolean()
    primary: boolean

    @ApiModelProperty()
    @IsNumber()
    secondary: number

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsString()
    additional?: string

}