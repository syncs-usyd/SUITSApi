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
		this.newsletter = memberObject.newsletter; this.registered = memberObject.registered;
		this.isPenultimate = memberObject.isPenultimate;
		this.doingIT = memberObject.doingIT;
		this.id = memberObject.id;
	}

	static async getMemberByEmail(email) {
		let data = await db.table('Member').filter({email: email}).run();
		if (data.length == 0)
			return null;
		return new Member(data[0]);
	}

	static async getMemberByAccess(access) {
		let data = await db.table('Member').filter({access: access}).run();
		if (data.length == 0)
			return null;
		return new Member(data[0]);
	}

	static async getMemberList() {
		let data = await db.table('Member').run();
		return data.map(m => new Member(m));
	}
	
	static async addMember(data) {
		let query = await db.table('Member').insert({
			firstName: data.firstName,
			lastName: data.lastName,
			gender: data.gender,
			email: data.email,
			access: data.access,
			sid: data.sid,
			newsletter: data.newsletter,
			isPenultimate: data.isPenultimate,
			doingIT: data.doingIT,
			joinedOn: new Date(),
			registered: data.registered
		})
		.run();

		return query.generated_keys[0];
	}

	async alterMember(newData) {
		db.table('Member').get(this.id).update(newData).run();
	}

}

let publicRoutes = r();

publicRoutes.post("/", async (ctx, next) => {
	let body = ctx.request.body;
	let member = null;
	if (body.email)
		member = await Member.getMemberByEmail(body.email);

	if (body.access && member == null)
		member = await Member.getMemberByAccess(body.access);

	let memberId = null;
	if (!member)
		memberId = await Member.addMember(body);
	else {
		body.registered = member.registered ? true : body.registered; // Cannot `unregister` an already registered member
		await member.alterMember(body);
		memberId = member.id;
	}
	
	ctx.body = {id: memberId};
	ctx.status = 200;
	await next();
});

let privateRoutes = r();

privateRoutes.get("/", async (ctx, next) => {
	ctx.body = await Member.getMemberList();
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
