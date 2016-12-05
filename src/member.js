import r from 'rethinkdbdash';
import config from '../config';

let db = r(config.db);

export default class Member {
	
	constructor(memberObject){
		this.firstName = memberObject.firstName;
		this.lastName = memberObject.lastName;
		this.gender = memberObject.gender;
		this.email = memberObject.email;
		this.access = memberObject.access;
		this.sid = memberObject.sid;
		this.newsletter = memberObject.newsletter;
	}

	static async getMember(email) {
		let data = await db.table('Member').get(email).run();
		if (data == null)
			return null;
		return new Member(data);
	}

	static async getMemberList() {
		let data = await db.table('Member').run();
		let members = [];
		for (let i = 0; i < data.length; i++) {
			members[i] = new Member(data[i]);
		}
		return members;
	}
	
	static async addMember(data) {
		await db.table('Member').insert({
			id: data.email,
			firstName: data.firstName,
			lastName: data.lastName,
			gender: data.gender,
			email: data.email,
			access: data.access,
			sid: data.sid,
			newsletter: data.newsletter
		})
		.run();
	}

	async alterMember(newData) {
		await db.table('Member').get(this.email).update(newData).run();
	}


}
