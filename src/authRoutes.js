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

router.get("/members/:id/attendance", async (ctx, next) => {
	let member = await Member.getMember(ctx.params.id);
	ctx.body = await member.getEvents();
	ctx.status = 200;
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
	await e.alterEvent(body);
	ctx.status = 200;
	await next();
});

router.delete("/events", async (ctx, next) => {
	let id = ctx.request.body.id;
	let e = await Event.getEvent(id);
	await e.deleteEvent();
	ctx.status = 200;
	await next();
});

router.get("/events/:id/attendance", async (ctx, next) => {
	let event = await Event.getEvent(ctx.params.id);
	ctx.body = await event.getAttendees();
	ctx.status = 200;
	await next();
});

router.post("/events/:id/attendance", async (ctx, next) => {
	let event = await Event.getEvent(ctx.params.id);
	await event.attendMember(ctx.body);
	ctx.status = 200;
	await next();
});

export default router;
