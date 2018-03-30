import 'reflect-metadata'
import * as express from 'express'
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const expressApp = express()
	const app = await NestFactory.create(ApplicationModule, expressApp, {})

	const options = new DocumentBuilder()
		.setTitle("SUITS API")
		.setDescription("SUITS API for memberships, events and attendance. All changes to the data can be observed via Socket.IO which can be procured if you have the API key.")
		.setVersion('3.0')
		.build()
	
	const document = SwaggerModule.createDocument(app, options)
	expressApp.use("/docs.json", (req, res, next) => res.send(document))
	await app.listen(3000);
}

bootstrap();