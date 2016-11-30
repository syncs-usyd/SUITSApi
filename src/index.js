import 'babel-polyfill';

import Koa from 'koa';
import pub from './publicRoutes';
import auth from './authRoutes';
import bodyParser from 'koa-bodyparser';
import config from '../config';
import jwt from 'koa-jwt'

const app = new Koa();

// Error logging
app.use( async (ctx, next) => {
	try {
		await next();
	}
	catch (e) {
		console.log(e.message);
	}
});

// CORS
app.use( async (ctx, next) => {
	ctx.set("Access-Control-Allow-Origin", "*");
	ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	await next();
});

app.use(bodyParser());

app.use(pub.routes()).use(pub.allowedMethods());
app.use(auth.routes());

app.listen(3000);

console.log("listening on port 3000");

