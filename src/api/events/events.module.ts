import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventEntity } from "../../entities";
import { EventsIdController } from "./events.id.controller";
import { EventsIndexController } from "./events.index.controller";
import { EventsService } from "./events.service";

@Module({
    controllers: [EventsIndexController, EventsIdController],
    exports: [EventsService],
    imports: [TypeOrmModule.forFeature([EventEntity])],
    providers: [EventsService],
})
export class EventsModule {}
