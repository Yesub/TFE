// app/models/user.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectId 	 = mongoose.Schema.Types.ObjectId;

var UserSchema = new Schema({
	alias: { type: String, required: false },
	birthDate: { type: String, required: false },
	email: { type: String, required: false },
	password: { type: String, required: false },
	photo: { type: String, required: false },
	name: {
		first: { type: String, required: false },
       	last: { type: String, required: false }
	},	
	role: { type: String, required: false }, //admin, superuser, user ...
	gender: { type: String, required: false },
	read: [
		{ type: ObjectId, required: false } //_id from Book
	],	
	follow: [
		//if a user follow another user, he can access to some of the informations, if two users follow each other they are friends
		{ type: ObjectId, required: false } //_id from User	
	],	
	owned: [
		{
			id: { type: ObjectId, required: false }, // _id from Book
			lendedTo: { type: String, required: false }, // either an ID of another User, either a name or null if not lended
			lendedSince: { type: String, required: false } //date from it has been lended, or null if not lended
		}
	],	
	readWishes: [
		{ type: ObjectId, required: false } // _id from Book
	],	
	ownWishes: [
		{ type: ObjectId, required: false } // _id from Book
	],	
	badges: [
		{ type: ObjectId, required: false } //_id from Badge
	]	
});

module.exports = mongoose.model('User', UserSchema);