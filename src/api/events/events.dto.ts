import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";

import { Event } from "interfaces";

export class EventDto implements Event {
    @ApiModelProperty()
    @IsString()
    public title: string;

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsString()
    public description?: string;

    @ApiModelProperty({ default: "Date.now()" })
    @IsDateString()
    public time: Date;
}
