import { Token } from './../../models/token';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController, LoadingController  } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BooksPage } from '../books/books';

import {LoginApi} from '../../providers/api-login/login';


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
	submitAttempt: boolean = false;	

  	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public formBuilder: FormBuilder,
		public menu: MenuController,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		private apiLogin: LoginApi)
	{	  
		this.loginForm = formBuilder.group({
		  alias: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
		  password: ['', Validators.required]
		});
  	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	login() {
		
		this.submitAttempt = true;

		if(this.loginForm.valid) {
			let loader = this.loadingCtrl.create({
				content: "Logging in..."
			});
			loader.present();

			var body = {
				alias: this.loginForm.controls.alias.value,
				password: this.loginForm.controls.password.value
			};

			this.apiLogin.log(body).subscribe(token => {
				console.log(token.status);
				if(token.status != '1') {
					let alert = this.alertCtrl.create({
						title:'Error in Logging', 
						subTitle:token.message,
						buttons:['OK']
					});
					alert.present();
				}
				loader.dismiss();
			});

			
		}
		
		//this.navCtrl.setRoot(BooksPage);
		//this.navCtrl.push(BooksPage);
	}

}
