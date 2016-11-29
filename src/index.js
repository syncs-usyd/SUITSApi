import 'babel-polyfill';

import Koa from 'koa';
import router from './routes';
import bodyParser from 'koa-bodyparser';

const app = new Koa();

app.use( async (ctx, next) => {
	ctx.set("Access-Control-Allow-Origin", "*");
	ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	await next();
});

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);

console.log("listening on port 3000");

