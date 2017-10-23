import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

import { FormBuilder, FormGroup} from '@angular/forms';
import { BooksPage } from '../books/books';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
		
	loginForm: FormGroup;

  	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public formBuilder: FormBuilder,
		public menu: MenuController) 
	{
	  
		this.loginForm = formBuilder.group({
		  login: [''],
		  password: ['']
		});
  	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	login() {
		this.navCtrl.setRoot(BooksPage);
		//this.navCtrl.push(BooksPage);
	}

}
