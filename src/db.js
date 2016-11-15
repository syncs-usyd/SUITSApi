import 'babel-polyfill'
import r from 'rethinkdbdash'

var config = {
	servers: [{host: 'rethink', port: 28015}],
	user: 'suits',
	password: '^f/N")&p7K,>hK$c'
}

var db = r(config);

export async function addMember(firstName, lastName, accessId, sid, wantsNewsletter, email){
	try{
		var result = await db.table('members').insert({
			firstName: firstName,
			lastName: lastName,
			accessId: accessId,
			sid: sid,
			wantsNewsletter: wantsNewsletter,
			email: email
		}).run();
	}	
	catch (e){
		console.log(e);
	}
}

export function test(){
	console.log("hello");
}


