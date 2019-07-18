import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventEntity } from "../../entities";
import { EventsIdController } from "./events.id.controller";
import { EventsIndexController } from "./events.index.controller";
import { EventsService } from "./events.service";

@Module({
    imports: [TypeOrmModule.forFeature([EventEntity])],
    controllers: [EventsIndexController, EventsIdController],
    components: [EventsService],
    exports: [EventsService],
})
export class EventsModule {}
