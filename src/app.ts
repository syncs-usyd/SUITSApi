import 'reflect-metadata'
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { Subscriber } from './websocket/subscriber'
import { WebSocketService } from 'websocket/websocket.service';
import { WebSocketModule } from 'websocket';

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule)
	await app.listen(3000);
	Subscriber.setWebsocket(app.select(WebSocketModule).get(WebSocketService).server);
}

bootstrap();