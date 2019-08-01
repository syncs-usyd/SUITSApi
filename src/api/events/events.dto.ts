import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";

import { IEvent } from "../../interfaces";

export class EventDto implements IEvent {
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
