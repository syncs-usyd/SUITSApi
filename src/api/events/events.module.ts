import { Module } from "@nestjs/common";
import { EventsIndexController } from "./events.index.controller";
import { EventsIdController } from "./events.id.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventEntity } from "entities";
import { EventsService } from "./events.service";

@Module({
    imports: [TypeOrmModule.forFeature([EventEntity])],
    controllers: [EventsIndexController, EventsIdController],
    components: [EventsService],
    exports: [EventsService]
})
export class EventsModule {}
