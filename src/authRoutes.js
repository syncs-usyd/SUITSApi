import r from 'koa-router';
import Member from './member';
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

export default router;
