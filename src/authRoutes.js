import r from 'koa-router';
import Member from './member';
import Event from './event';
import jwt from 'koa-jwt';
import config from '../config';

let router = r();

router.use(async (ctx, next) => {
	try {
		await next();
	}
	catch (e) {
		if (e.status == 401) {
			ctx.status = 401;
			ctx.body = {
				error: 401,
				message: "Protected resource. Use the Authorization header with a Bearer prefix to get access"
			};
		}
		else {
			throw e;
		}
	}
});

router.use(jwt({secret : config.jwtSecret}));

router.get("/members", async (ctx, next) => {
	ctx.body = await Member.getMemberList();
	await next();
});

router.post("/events", async (ctx, next) => {
	let body = ctx.request.body;
	await Event.addEvent(body);
	ctx.status = 200;
	await next();
});

router.patch("/events", async (ctx, next) => {
	let body = ctx.request.body;
	let e = await Event.getEvent(body.id);
	e.alterEvent(body);
	await next();
});

router.delete("/events", async (ctx, next) => {
	let id = ctx.request.body.id;
	let e = await Event.getEvent(id);
	e.deleteEvent();
});

export default router;
