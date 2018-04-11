import { Module } from '@nestjs/common';
import { EventsIndexController } from './events.index.controller';
import { EventsIdController } from './events.id.controller'
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'entities';
import { AuthModule } from 'api/auth';

@Module({
    imports: [TypeOrmModule.forFeature([EventEntity]), AuthModule],
    controllers: [EventsIndexController, EventsIdController],
    components: [EventsService]
})
export class EventsModule {}
