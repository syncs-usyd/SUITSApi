import 'babel-polyfill';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routes';

const app = new Koa();

// Error logging
app.use( async (ctx, next) => {
	try {
		await next();
	}
	catch (e) {
		console.log(e);
	}
});

// CORS
app.use( async (ctx, next) => {
	ctx.set("Access-Control-Allow-Origin", "*");
	ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	await next();
});

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);

console.log("listening on port 3000");
