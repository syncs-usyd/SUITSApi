import { Event } from "interfaces/event";
import { IsString, IsOptional, IsDate } from "class-validator";

export class EventDto implements Event {

    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsDate()
    time: Date;
}