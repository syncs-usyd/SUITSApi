import r from 'rethinkdbdash'

var config = {
	servers: [{host: 'rethink', port: 28015}],
	db: "SUITS",
	user: 'suits',
	password: 'EWa^kF#Z:@/%h`72'
}

var db = r(config);

export async function addMember(firstName, lastName, gender, email, access, sid, newsletter){
	try{
		return await db.table('Member').insert({
			firstName: firstName,
			lastName: lastName,
			gender: gender,
			email: email,
			access: access,
			sid: sid,
			newsletter: newsletter
		}).run();
	}	
	catch (e){
		return null;
	}
}

export async function getMembers() {
	try {
		return await db.table('Member').run();
	}
	catch (e) {
		return null;
	}
}
