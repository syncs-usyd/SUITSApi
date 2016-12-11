import r from 'koa-router';
import jwt from 'koa-jwt';
import config from '../config';

import * as Member from './member';
import * as Event from './event';
import * as Token from './token';

let router = r();

router.use('/members', Member.publicRoutes.routes());
router.use('/events', Event.publicRoutes.routes());
router.use('/token', Token.publicRoutes.routes());

//dividing public from protected routes
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

//protected routes here

router.use('/members', Member.privateRoutes.routes());
router.use('/events', Event.privateRoutes.routes());
router.use('/token', Token.privateRoutes.routes());

export default router;
