import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";

import { IEvent } from "../../interfaces";

export class EventDto implements IEvent {
    @ApiProperty()
    @IsString()
    public title: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    public description?: string;

    @ApiProperty({ default: "Date.now()" })
    @IsDateString()
    public time: Date;
}
