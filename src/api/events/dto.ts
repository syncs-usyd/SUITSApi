import { Event } from "interfaces/event";
import { IsString, IsOptional, IsDate, IsDateString } from "class-validator";

export class EventDto implements Event {

    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsDateString()
    time: Date;
}