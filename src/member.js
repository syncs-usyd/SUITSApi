import db from './db';
import Event from './event';
import r from 'koa-router';
import socket from './socket';

class Member {
	
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

let publicRoutes = r();

publicRoutes.post("/", async (ctx, next) => {
	let body = ctx.request.body;
	let member = null;
	if (body.email != undefined)
		member = await Member.getMember(body.email);

	if (member == null)
		await Member.addMember(body);
	else
		await member.alterMember(body);
	ctx.status = 200;
	await next();
});

let privateRoutes = r();

privateRoutes.get("/", async (ctx, next) => {
	ctx.body = await Member.getMemberList();
	await next();
});

privateRoutes.get("/:id/attendance", async (ctx, next) => {
	let member = await Member.getMember(ctx.params.id);
	ctx.body = await member.getEvents();
	ctx.status = 200;
	await next();
});

//changes
db.table('Member').changes().run((err, cursor) => {
	cursor.each((err, change) => {
		if (change.old_val == null) {
			// new member
			socket.emit("newMember", change.new_val);
		}
		else if (change.old_val != null && change.new_val != null) {
			// member change
			socket.emit("updateMember", change.new_val);
		}
	});
});

export { Member, publicRoutes, privateRoutes};
