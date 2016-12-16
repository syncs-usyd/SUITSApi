import r from 'koa-router';
import jwt from 'koa-jwt';
import config from '../config';

import * as Member from './member';
import * as Event from './event';
import * as Token from './token';

let publicRouter = r();

publicRouter.use('/members', Member.publicRoutes.routes());
publicRouter.use('/events', Event.publicRoutes.routes());
publicRouter.use('/token', Token.publicRoutes.routes());

let privateRouter = r();
//dividing public from protected routes
privateRouter.use(async (ctx, next) => {
	try {
		await next();
	}
	catch (e) {
		if (e.status == 401) {
			ctx.status = 401;
			console.log("HIT");
			console.log(e);

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

privateRouter.use(jwt({secret : config.jwtSecret}));

//protected routes here

privateRouter.use('/members', Member.privateRoutes.routes());
privateRouter.use('/events', Event.privateRoutes.routes());
privateRouter.use('/token', Token.privateRoutes.routes());

export { publicRouter, privateRouter };
