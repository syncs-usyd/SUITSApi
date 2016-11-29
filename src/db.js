import r from 'rethinkdbdash';
import config from '../config';

var db = r(config.db);

export async function addMember(firstName, lastName, gender, email, access, sid, newsletter){
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

export async function getMembers() {
	return await db.table('Member').run();
}
