import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Book } from '../../models/book';

/**
 * Generated class for the BookDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-book-details',
  templateUrl: 'book-details.html',
})
export class BookDetailsPage {
	book: Book;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  this.book = navParams.get('book');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookDetailsPage');
  }

}
