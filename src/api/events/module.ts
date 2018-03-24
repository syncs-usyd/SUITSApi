import { Module } from '@nestjs/common';
import * as controllers from './controllers';
import { EventService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'entities';

@Module({
    imports: [TypeOrmModule.forFeature([EventEntity])],
    controllers: [controllers.EventIndexController, controllers.EventIdController],
    components: [EventService]
})
export class EventModule {}
