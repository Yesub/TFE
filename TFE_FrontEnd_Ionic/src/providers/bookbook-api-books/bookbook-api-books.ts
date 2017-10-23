import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Book } from '../../models/book';
/*
  Generated class for the BookbookApiBooksProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BookbookApiBooksProvider {
	booksApiUrl = '//localhost:8080/api';
	
  	constructor(public http: Http) { 
		console.log('Hello BookbookApiBooksProvider Provider');
	}
	  
	//Load all books
	load(): Observable<Book[]> {
	  return this.http.get(`${this.booksApiUrl}/books`)
		.map(res => <Book[]>res.json());
	}
	
	//Search for a book
	searchBook(body): Observable<Book[]> {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		
		
		return this.http.post(`${this.booksApiUrl}/books/search`, JSON.stringify(body), {headers: headers})
 		.map(res => <Book[]>res.json())
		
	}
  

}
