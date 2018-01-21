import { Token } from './../../models/token';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController, LoadingController  } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BooksPage } from '../books/books';

import { LoginApi } from '../../providers/api-login/login';
import { Storage } from '@ionic/storage';

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
		private apiLogin: LoginApi,
		public storage: Storage
		)
	{	  
		this.loginForm = formBuilder.group({
		  alias: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
		  password: ['', Validators.required]
		});
  	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}
	/**
	 * If the From is valid try to log the user with alias and password
	 * If info are valid, the API send back a status ("1" if valid) and a token which is store
	 * WHel logged the user is sent to BooksPage
	 */
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
				//console.log(token.status);
				if(token.status != '1') {
					let alert = this.alertCtrl.create({
						title:'Error in Logging', 
						subTitle:token.message,
						buttons:['OK']
					});
					alert.present();
				} else if (token.status === '1') {
					this.storage.set('token',token.token);
					this.navCtrl.setRoot(BooksPage);
				} else {
					let alert = this.alertCtrl.create({
						title:'Unknown error', 
						subTitle:'An unknown error occured, please try again.',
						buttons:['OK']
					});
					alert.present();
				}
				loader.dismiss();
			});

			
		}
	}

}
