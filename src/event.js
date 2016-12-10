import db from './db'
import Member from './member';

export default class Event {
	
	constructor(eventObject) {
		this.title = eventObject.title;
		this.desc = eventObject.desc;
		this.id = eventObject.id;
		this.time = eventObject.time;
	}

	static async getEvent(id) {
		let data = await db.table('Event').get(id).run();
		if (data == null)
			return null;
		return new Event(data);
	}

	static async getEventList() {
		let data = await db.table('Event').run();
		return data.map(e => new Event(e));
	}

	static async addEvent(data) {
		await db.table('Event').insert({
			title: data.title,
			desc: data.desc,
			time: data.time,
			attendees: [] // When adding a new event, there are no attendees.
		})
		.run();
	}
	
	async alterEvent(newData) {
		db.table('Event').get(this.id).update(newData).run();
	}

	async getAttendees() {
		let attendees = await db.table('Attendance')
		.filter({eventId: this.id})
		.pluck("memberId", "personData")
		.run();

		let memberIds = [];
		let nonMembers = [];

		for (let i = 0; i < attendees.length; i++) {
			if (attendees[i].personData != undefined)
				nonMembers.push(attendees[i].personData);
			else
				memberIds.push(attendees[i].memberId);
		}

		let members = await db.expr(memberIds)
		.eqJoin((x => x), db.table('Member'))
		.run();

		members = members.map(m => m.right); // grab the data
		members = members.concat(nonMembers); // Also add the non-members
		return members;
	}

	async attendPerson(personData) {
		if (personData.memberId != undefined)
			db.table('Attendance').insert({eventId: this.id, memberId: memberId});
		else
			db.table('Attendance').insert({eventId: this.id, person: personData});
	}

	async deleteEvent() {
		db.table('Event').get(this.id).delete().run();
	}
}
