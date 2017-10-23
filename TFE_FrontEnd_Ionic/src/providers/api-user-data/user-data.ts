import { Injectable } from '@angular/core';

//import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { User } from '../../models/user';


@Injectable()
export class UserDataProvider {
  
	HAS_LOGGED_IN = 'hasLoggedIn';
	user: User;
	constructor(
		public storage: Storage
	) {}
	
	login(alias: string, password: string) {
		this.storage.set(this.HAS_LOGGED_IN, true);
		this.setAlias(alias);
	}
	
	
	/*
	login(username: string): void {
	this.storage.set(this.HAS_LOGGED_IN, true);
	this.setUsername(username);
	this.events.publish('user:login');
	};
	*/
	
	signup(alias: string): void {
		this.storage.set(this.HAS_LOGGED_IN, true);
		this.setAlias(alias);
		//this.events.publish('user:signup');
	};

	logout(): void {
		this.storage.remove(this.HAS_LOGGED_IN);
		this.storage.remove('alias');
		//this.events.publish('user:logout');
	};

	setAlias(alias: string): void {
		this.storage.set('alias', alias);
	};

	getAlias(): Promise<string> {
		return this.storage.get('alias').then((value) => {
			return value;
		});
	};

	hasLoggedIn(): Promise<boolean> {
		return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
			return value === true;
		});
	};

	/*
	checkHasSeenTutorial(): Promise<string> {
	return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
	  return value;
	});
	};
	*/
}