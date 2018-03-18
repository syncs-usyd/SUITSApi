import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { WebSocketService } from './websocket';
import { Subscriber } from './websocket/subscriber'

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
	await app.listen(3000);
	Subscriber.setWebsocket(app.get(WebSocketService).server);
}

bootstrap();