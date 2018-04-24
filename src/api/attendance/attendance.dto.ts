import { Attendance } from "interfaces";
import { IsBoolean, IsOptional, IsString } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class AttendanceDto implements Attendance {

    @ApiModelProperty()
    @IsBoolean()
    primary: boolean

    @ApiModelProperty()
    @IsBoolean()
    secondary: boolean

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsString()
    additional?: string

}