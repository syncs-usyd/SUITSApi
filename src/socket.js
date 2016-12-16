import IO from 'socket.io';
import { Token } from './token';

let socket = new IO({ serveClient: false });

socket.use( (socket, next) => {
	let t = socket.handshake.query.token;
	if (!Token.isValid(t))
		socket.disconnect();
	else
		next();
});

export default socket;
