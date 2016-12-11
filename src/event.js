import db from './db'
import Member from './member';
import r from 'koa-router';

class Event {
	
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

let publicRoutes = r();

publicRoutes.get("/", async (ctx, next) => {
	ctx.body = await Event.getEventList();
	await next();
});

let privateRoutes = r();

privateRoutes.post("/", async (ctx, next) => {
	let body = ctx.request.body;
	await Event.addEvent(body);
	ctx.status = 200;
	await next();
});

privateRoutes.patch("/", async (ctx, next) => {
	let body = ctx.request.body;
	let e = await Event.getEvent(body.id);
	await e.alterEvent(body);
	ctx.status = 200;
	await next();
});

privateRoutes.delete("/", async (ctx, next) => {
	let id = ctx.request.body.id;
	let e = await Event.getEvent(id);
	await e.deleteEvent();
	ctx.status = 200;
	await next();
});

privateRoutes.get("/:id/attendance", async (ctx, next) => {
	let event = await Event.getEvent(ctx.params.id);
	ctx.body = await event.getAttendees();
	ctx.status = 200;
	await next();
});

privateRoutes.post("/:id/attendance", async (ctx, next) => {
	let event = await Event.getEvent(ctx.params.id);
	await event.attendMember(ctx.body);
	ctx.status = 200;
	await next();
});

export {Event, publicRoutes, privateRoutes};
