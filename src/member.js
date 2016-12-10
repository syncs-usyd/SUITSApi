import db from './db';
import Event from './event';


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
		return data.map(m => new Member(m));
	}
	
	static async addMember(data) {
		db.table('Member').insert({
			id: data.email,
			firstName: data.firstName,
			lastName: data.lastName,
			gender: data.gender,
			email: data.email,
			access: data.access,
			sid: data.sid,
			newsletter: data.newsletter,
			joinedOn: new Date()
		})
		.run();
	}

	async alterMember(newData) {
		db.table('Member').get(this.email).update(newData).run();
	}

	async getEvents() {
		let eventIds = await db.table('Attendance')
		.filter({memberId: this.email})
		.pluck("eventId")
		.run();
		eventIds = eventIds.map(x => x.eventId); // get an array of just the ids

		let events = await db.expr(eventIds)
		.eqJoin((x => x), db.table('Event'))
		.run();
		events = events.map(e => e.right);

		return events.map(e => new Event(e));
	}
}
