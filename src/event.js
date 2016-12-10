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

	async getMembers() {
		let memberIds = await db.table('Attendance')
		.filter({eventId: this.id})
		.pluck("memberId")
		.run();
		memberIds = memberIds.map(x => x.memberId);

		let members = await db.expr(memberIds)
		.eqJoin((x => x), db.table('Member'))
		.run();
		members = members.map(m => m.right);
		return members.map(m => new Member(m));
	}

	async attendMember(memberId) {
		db.table('Attendance').insert({eventId: this.id, memberId: memberId});
	}

	async deleteEvent() {
		db.table('Event').get(this.id).delete().run();
	}
}
