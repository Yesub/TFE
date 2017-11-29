import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


export class AliasValidator {

    apiUrl = '//localhost:8080/api';
    response ;
    
    constructor(public http: Http) { 
        this.response = this.http.get(`${this.apiUrl}/signup/checkalias?alias=simpleUser`);
        console.log(this.response);
	}
    static checkAlias(control: FormControl): any {

        //console.log(this.response);
        return new Promise(resolve => {
            
            
        /* 
        //Fake a slow response from server

        setTimeout(() => {
        if(control.value.toLowerCase() === "greg"){

            resolve({
            "username taken": true
            });

        } else {
            resolve(null);
        }
        }, 2000);
        */

        });
    }  

}