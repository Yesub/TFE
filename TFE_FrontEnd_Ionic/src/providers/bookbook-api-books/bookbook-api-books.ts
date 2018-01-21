import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { Book } from '../../models/book';
/*
  Generated class for the BookbookApiBooksProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BookbookApiBooksProvider {
	booksApiUrl = '//localhost:8080/api';
	token;
	
  	constructor(public http: Http, public storage: Storage) { 
		console.log('Hello BookbookApiBooksProvider Provider');
		
		
	}
	  
	//Load all books
	load(): Observable<Book[]> {
		/*
		this.storage.get('token').then((value) => {
			this.token = value;
			console.log(value);
		});
		let headers = new Headers();
		//headers.append('Content-Type', 'x-www-form-urlencoded');
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		headers.append('Accept', 'application/json');
		headers.append('Authorization', 'Bearer ' + this.token);
		
		let options = new RequestOptions({ headers: headers });
		console.log(options);
		*/
	 	return this.http.get(`${this.booksApiUrl}/books`, this.loadOptions())
		.map(res => <Book[]>res.json());
	}

	loadOptions(): RequestOptions {
		/*
		this.storage.get('token').then((value) => {
			this.token = value;
			console.log(value);
		});
		*/
		let headers = new Headers();
		//headers.append('Content-Type', 'x-www-form-urlencoded');
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		headers.append('Accept', 'application/json');
		headers.append('Authorization', 'Bearer ' + this.getToken());
		
		let options = new RequestOptions({ headers: headers });
		console.log(options);
		return options;
	}

	getToken(): any {
		return this.storage.get('token'); 
		/*
		.then((value) => {
			this.token = value;
			console.log(value);
		});
		*/
	}
	
	//Search for a book
	searchBook(body): Observable<Book[]> {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		
		
		return this.http.post(`${this.booksApiUrl}/books/search`, JSON.stringify(body), {headers: headers})
 		.map(res => <Book[]>res.json())
		
	}
  

}
