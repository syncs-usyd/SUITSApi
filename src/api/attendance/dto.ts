import { Attendance } from "interfaces/attendance";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class AttendanceDto implements Attendance {

    @IsBoolean()
    primary: boolean

    @IsBoolean()
    secondary: boolean

    @IsOptional()
    @IsString()
    additional?: string

}