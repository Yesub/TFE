import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { BooksPage } from '../pages/books/books';
import { BookDetailsPage} from '../pages/book-details/book-details';
import {LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BookbookApiBooksProvider } from '../providers/bookbook-api-books/bookbook-api-books';
import { UserDataProvider } from '../providers/api-user-data/user-data';
import { LoginApi } from '../providers/api-login/login';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    BooksPage,
	  BookDetailsPage,
  	LoginPage
  ],
  imports: [
    BrowserModule,
  	HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BooksPage,
  	BookDetailsPage,
  	LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BookbookApiBooksProvider,
    UserDataProvider,
    LoginApi
  ]
})
export class AppModule {}
