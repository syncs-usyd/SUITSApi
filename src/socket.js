import IO from 'koa-socket';
import { Token } from './token';

let socket = new IO();

socket.on('connection',  async ctx => {
	//rudimentary authentication middleware
	let t = ctx.socket.handshake.query.token;
	if (!Token.isValid(t))
		ctx.socket.disconnect("You must have a token to receive a connection");
	
})

export default socket;
