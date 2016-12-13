import r from 'koa-router';
import config from '../config';
import jwt from 'jsonwebtoken';

class Token {
	static compare(a,b) {
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
	
	static getToken(user, pass) {
		if (compare(user, "suits") && compate(pass, config.suitsPass))
			return jwt.sign({user: "suits"}, config.jwtSecret);
		else
			return null;
	}

	static isValid(token){
		try{
			jwt.verify(token, config.jwtSecret);
		}
		catch (e) {
			return false;
		}
		return true;
	}
}

let publicRoutes = r();

publicRoutes.post("/", async (ctx, next) => {
	let body = ctx.request.body;
	let token = Token.getToken(body.user, body.pass);
	if (token != null)
		ctx.body = {token: token};
	else {
		ctx.status = 401;
		ctx.body = {
			error: 401,
			message: "Incorrect login"
		};
	}
});

let privateRoutes = r();

export {Token, publicRoutes, privateRoutes};
