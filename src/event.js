import db from './db'
import Member from './member';
import r from 'koa-router';
import socket from './socket';

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
			time: data.time
		})
		.run();
	}
	
	async alterEvent(newData) {
		db.table('Event').get(this.id).update(newData).run();
	}
	
	async deleteEvent() {
		await Promise.all([
			db.table('Event').get(this.id).delete().run(),
			db.table('Attendance').filter({eventId: this.id}).delete().run()
		]);
	}

	async getAttendance() {
		let attendees = await db.table('Attendance')
		.filter({eventId: this.id})
		.without('eventId')
		.run();

		return attendees;
	}
		
	async getAttendanceForMember(memberId) {
		let attendance = await db.table('Attendance')
		.filter({eventId: this.id, memberId: memberId})
		.without('eventId', 'memberId')
		.run();

		if (attendance.length == 0)
			return null
		return attendance[0];
	}

	async attendMember(memberId, data) {
		db.table('Attendance').insert({eventId: this.id, memberId: memberId, data: data}).run();
	}

	async alterAttendance(memberId, data) {
		db.table('Attendance').filter({eventId: this.id, memberId: memberId}).update({data: data}).run();
	}

	async deleteAttendance(memberId) {
		db.table('Attendance').filter({eventId: this.id, memberId: memberId}).delete().run();
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

privateRoutes.use("/:id", async (ctx, next) => {
	let event = await Event.getEvent(ctx.params.id);
	if (event == null) {
		ctx.status = 404;
		return;
	}
	ctx.event = event;
	await next();
});

privateRoutes.get("/:id", async (ctx, next) => {
	let event = ctx.event;
	ctx.status = 200;
	ctx.body = event;
	await next();
});

privateRoutes.put("/:id", async (ctx, next) => {
	let event = ctx.event;
	let body = ctx.request.body;
	let e = await Event.getEvent(body.id);
	await e.alterEvent(body);
	ctx.status = 200;
	await next();
});

privateRoutes.delete("/:id", async (ctx, next) => {
	let event = ctx.event;
	await event.deleteEvent();
	ctx.status = 200;
	await next();
});

privateRoutes.get("/:id/attendance", async (ctx, next) => {
	let event = ctx.event;
	ctx.body = await event.getAttendance();
	ctx.status = 200;
	await next();
});

privateRoutes.get("/:id/attendance/:userId", async (ctx, next) => {
	let event = ctx.event;
	let attendance = await event.getAttendanceForMember(ctx.params.userId);
	if (attendance == null) {
		ctx.status = 404;
		return;
	}
	ctx.status = 200;
	ctx.body = attendance;
	await next();
});

privateRoutes.put("/:id/attendance/:userId", async (ctx, next) => {
	let event = ctx.event;
	let attendance = await event.getAttendanceForMember(ctx.params.userId);
	if (attendance == null)
		event.attendMember(ctx.params.userId, ctx.request.body);
	else
		event.alterAttendance(ctx.params.userId, ctx.request.body);
	ctx.status = 200;
	await next();
});

privateRoutes.delete("/:id/attendance/:userId", async (ctx, next) => {
	let event = ctx.event;
	let attendance = await event.getAttendanceForMember(ctx.params.userId);
	if (attendance == null) {
		ctx.status = 404;
		return;
	}
	else
		event.deleteAttendance(ctx.params.userId);
	ctx.status = 200;
	await next();
});

//Event changes
db.table('Event').changes().run((err, cursor) => {
	cursor.each((err, change) => {
		if (change.old_val == null) {
			// new event
			socket.emit("newEvent", change.new_val);
		}
		else if (change.old_val != null && change.new_val != null) {
			// event change
			socket.emit("updateEvent", change.new_val);
		}
		else {
			// event deleted
			socket.emit("deleteEvent", {id: change.old_val.id});
		}
	});
});

db.table('Attendance').changes().run((err, cursor) => {
	cursor.each((err, change) => {
		if (change.old_val == null) {
			// new event
			socket.emit("newAttendance", change.new_val);
		}
		else if (change.old_val != null && change.new_val != null) {
			// event change
			socket.emit("updateAttendance", change.new_val);
		}
		else {
			// event deleted
			socket.emit("deleteAttendance", {memberId: change.old_val.memberId, eventId: change.old_val.eventId});
		}
	});
});

export {Event, publicRoutes, privateRoutes};
