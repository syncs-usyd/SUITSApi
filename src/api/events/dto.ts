import { Event } from "interfaces/event";
import { IsString, IsOptional, IsDate, IsDateString } from "class-validator";
import { ApiModelPropertyOptional, ApiModelProperty } from "@nestjs/swagger";

export class EventDto implements Event {

    @ApiModelProperty()
    @IsString()
    title: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiModelProperty({default: "Date.now()"})
    @IsDateString()
    time: Date;
}