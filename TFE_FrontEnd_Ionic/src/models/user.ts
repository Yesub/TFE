export interface User {
	alias: string;
	birthDate: string;
	email: string;
	password: string;
	photo: string;
	name: {
		first: string;
		last: string;
	};
	role: string; //admin, superuser, user ...
	gender: string;
	read: [
		string //_id from Book
	];
	follow: [
	//if a user follow another user, he can access to some of the informations, if two users follow each other they are friends
		string //_id from User
	];
	owned: [
		{
			id: string; // _id from Book
			lendedTo: string; //either an ID of another User, either a name or null if not lended
			lendedSince: string; //date from it has been lended, or null if not lended
		}
	];
	readWishes: [
		string // _id from Book
	];
	ownWishes: [
		string // _id from Book
	];
	badges: [
		string //_id from Badge
	]
}