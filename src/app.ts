import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as Sentry from "@sentry/node";
import * as express from "express";
import "reflect-metadata";
import { ApplicationModule } from "./app.module";

const config = require("../config.json");

async function bootstrap() {
    const expressApp = express();

    if (config.sentry) {
        Sentry.init(config.sentry);
    }

    const app = await NestFactory.create(ApplicationModule, expressApp, {});
    app.enableCors();

    const options = new DocumentBuilder()
        .setTitle("SUITS API")
        .setDescription(
            "SUITS API for memberships, events and attendance. All changes to the data can be observed via Socket.IO which can be procured if you have the API key.",
        )
        .setVersion("3.0")
        .build();

    const document = SwaggerModule.createDocument(app, options);
    expressApp.use("/docs.json", (req, res) => res.send(document));

    await app.listen(config.listen || 3000);
}

bootstrap();
