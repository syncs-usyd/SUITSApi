import 'babel-polyfill';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import {publicRouter, privateRouter} from './routes';
import socket from './socket';
import http from 'http';

const app = new Koa();

// Error logging
app.use( async (ctx, next) => {
	try {
		await next();
	}
	catch (e) {
		console.log(e);
		ctx.status = 500;
		ctx.body = {
			error: 500,
			message: "Something went wrong"
		};
	}
});

// CORS
app.use( async (ctx, next) => {
	ctx.set("Access-Control-Allow-Origin", "*");
	ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	await next();
});

app.use(bodyParser());

app
	.use(publicRouter.routes())
	.use(privateRouter.routes())
	.use(publicRouter.allowedMethods());

let server = http.createServer(app.callback());

socket.attach(server)

server.listen(3000);

console.log("listening on port 3000");
