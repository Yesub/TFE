import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Book } from '../../models/book';

import { FormBuilder, FormGroup /*, Validators */} from '@angular/forms';

import { BookDetailsPage } from '../book-details/book-details';

import {BookbookApiBooksProvider} from '../../providers/bookbook-api-books/bookbook-api-books';


/**
 * Generated class for the BooksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-books',
  templateUrl: 'books.html',
})

export class BooksPage {
	
	books: Book[] = new Array;
	originalBooks: Book[] = new Array;
	searchBooks: Book[] = new Array;
	
	searchBookForm: FormGroup;
	
	submitAttempt: boolean = false;
	
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private booksProvider: BookbookApiBooksProvider,
		public formBuilder: FormBuilder) {

		booksProvider.load().subscribe(books => {
			for(var j = 0; j < books.length ; j++) {
				this.books.push(books[j]);
				this.originalBooks.push(books[j]);
				this.searchBooks.push(books[j]);
			}
		});
		
		this.searchBookForm = formBuilder.group({
			author: [''],
			title: [''],
			category: [''],
			searchInGoogle: false
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad BooksPage');
	}
	
	searchForBook() {
		var searchTerms = {
			intitle: "",
			inauthor: "",
			incategory: "",
			inGoogle: "false"
		};
		if(this.searchBookForm.value.author) {
			searchTerms.inauthor = this.searchBookForm.value.author;
		}
		if(this.searchBookForm.value.title) {
			searchTerms.intitle = this.searchBookForm.value.title;
		}
		if(this.searchBookForm.value.category) {
			searchTerms.incategory = this.searchBookForm.value.category;
		}
		if(this.searchBookForm.value.searchInGoogle){
			searchTerms.inGoogle = "true";
		}
		
		this.booksProvider.searchBook(searchTerms).subscribe(books => {
			console.log("J'y suis");
			console.log(books.length);
			this.books.length = 0;
			this.originalBooks.length = 0;
			this.searchBooks.length = 0;
			if(books.length > 0) {				
				for(var k = 0; k < books.length ; k++) {
					this.books.push(books[k]);
					this.originalBooks.push(books[k]);
					this.searchBooks.push(books[k]);
				}
			}
		})
	};
	
	goToDetails(book: Book) {
		this.navCtrl.push(BookDetailsPage, {book});
	};
	
	search(searchEvent) {
		//take the value in the searchBar
		var term = searchEvent.target.value;
		if (term.trim().length > 1) {
			//empty the searchBooks list
			this.searchBooks.length = 0;
			for(var i = 0 ; i < this.originalBooks.length; i++) {
				//if the title of the book contains the search term, add it in the searchBooks list
				if(~this.originalBooks[i].title.toLowerCase().indexOf(term.toLowerCase())) {
					this.searchBooks.push(this.originalBooks[i]);
				}
			}
			//put the searchBooks list in the books list for displaying
			this.books = this.searchBooks;			
		} else {
			this.books = this.originalBooks;
		}
	}

}
