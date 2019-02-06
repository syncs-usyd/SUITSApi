import { ApiModelPropertyOptional, ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsDate, IsDateString } from "class-validator";

import { Event } from "interfaces";

export class EventDto implements Event {
    @ApiModelProperty()
    @IsString()
    title: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiModelProperty({ default: "Date.now()" })
    @IsDateString()
    time: Date;
}
