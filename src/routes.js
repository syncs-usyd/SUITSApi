import r from 'koa-router';
import * as db from './db';
var router = r();

router.post("/members", async (ctx, next) => {
	let body = ctx.request.body;
	await db.addMember(body.firstName, body.lastName, body.gender, body.email, body.access, body.sid, body.newsletter);
	ctx.status = 200;
	await next();
});

router.get("/members", async (ctx, next) => {
	ctx.body = await db.getMembers();
	await next();
});

export default router;
