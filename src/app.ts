import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { WebSocketService } from './websocket';
import { Subscriber } from './websocket/subscriber'

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
	Subscriber.setWebsocket(app.get(WebSocketService).server);
	await app.listen(3000);
}

bootstrap();