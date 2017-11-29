import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Token } from '../../models/token';

/*
  Generated class for the ApiLogin provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoginApi {
	apiUrl = '//localhost:8080/api';
	
  	constructor(public http: Http) { 
		console.log('Hello LoginApi Provider');
	}
	  
	//Log a user
	log(body): Observable<Token> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post(`${this.apiUrl}/login`, JSON.stringify(body), {headers: headers})
        .map(res => <Token>res.json());
	}  

}