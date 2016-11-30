import r from 'koa-router';
import * as db from './db';
import config from '../config';
import jwt from 'jsonwebtoken';


let router = r();

// Safe string comparison in constant time.
function compare (a, b) {
	if (typeof a !== 'string' || typeof b !== 'string') return false;

	var mismatch = a.length === b.length ? 0 : 1;
	if (mismatch) {
		b = a;
	}

	for (var i = 0, il = a.length; i < il; ++i) {
		mismatch |= (a.charCodeAt(i) ^ b.charCodeAt(i));
	}

	return mismatch === 0;
}

router.post("/members", async (ctx, next) => {
	let body = ctx.request.body;
	await db.addMember(body.firstName, body.lastName, body.gender, body.email, body.access, body.sid, body.newsletter);
	ctx.status = 200;
	await next();
});

router.post("/token", async (ctx, next) => {
	let body = ctx.request.body;
	if (compare(body.user, "suits") && compare(body.password, config.suitsPass)) {
		ctx.body = {token: jwt.sign({user: "suits"}, config.jwtSecret)}
	}
	else {
		ctx.status = 401;
		ctx.body = {
			error: 401,
			message: "Incorrect login"
		};
	}

});

export default router;
