var Book = require('../models/book');

exports.add = function (fields) {
	if(fields.fromGoogle) {
		fields = exports.fromGoogleToDB(fields);
		console.log("adding from google to DB");
	}
	Book.create(fields, function (err) {
		if(err) {
			console.log(err);
			
		} else {
			console.log("added");
			
		}
	});
	
	
};

//this function formatize fields of a book which come from Google DB
exports.fromGoogleToDB = function (googleBook) {
	var fields = new Book();
	if(googleBook.volumeInfo.title) {
		fields.title = googleBook.volumeInfo.title;
	} else {
		fields.title = null;
	}
	if(googleBook.volumeInfo.subtitle) {
		fields.subtitle = googleBook.volumeInfo.subtitle;
	} else {
		fields.subtitle = null;
	}
	if(googleBook.volumeInfo.authors) {
		fields.authors = googleBook.volumeInfo.authors;
	} else {
		fields.authors = null;
	}
	if(googleBook.volumeInfo.publisher) {
		fields.publisher = googleBook.volumeInfo.publisher;
	} else {
		fields.publisher = null;
	}
	if(googleBook.volumeInfo.publishedDate) {
		fields.publishedDate = googleBook.volumeInfo.publishedDate;
	} else {
		fields.publishedDate = null;
	}
	if(googleBook.volumeInfo.description) {
		fields.description = googleBook.volumeInfo.description;
	} else {
		fields.description = null;
	}
	if(googleBook.volumeInfo.industryIdentifiers) {
		fields.industryIdentifiers = googleBook.volumeInfo.industryIdentifiers;
	} else {
		fields.industryIdentifiers = null;
	}
	if(googleBook.volumeInfo.pageCount) {
		fields.pageCount = googleBook.volumeInfo.pageCount;
	} else {
		fields.pageCount = null;
	}
	if(googleBook.volumeInfo.dimensions) {
		fields.dimensions = googleBook.volumeInfo.dimensions;
	} else {
		fields.dimensions = null;
	}
	if(googleBook.volumeInfo.printType) {
		fields.printType = googleBook.volumeInfo.printType;
	} else {
		fields.printType = null;
	}
	if(googleBook.volumeInfo.mainCategory) {
		fields.mainCategory = googleBook.volumeInfo.mainCategory;
	} else {
		fields.mainCategory = null;
	}
	if(googleBook.volumeInfo.categories) {
		fields.categories = googleBook.volumeInfo.categories;
	} else {
		fields.categories = null;
	}
	if(googleBook.volumeInfo.averageRating) {
		fields.averageRating = googleBook.volumeInfo.averageRating;
	} else {
		fields.averageRating = null;
	}
	if(googleBook.volumeInfo.ratingsCount) {
		fields.ratingsCount = googleBook.volumeInfo.ratingsCount;
	} else {
		fields.ratingsCount = null;
	}
	if(googleBook.volumeInfo.imageLinks) {
		fields.imageLinks = googleBook.volumeInfo.imageLinks;
	} else {
		fields.imageLinks = null;
	}
	if(googleBook.volumeInfo.language) {
		fields.language = googleBook.volumeInfo.language;
	} else {
		fields.language = null;
	}
	return fields;
};

exports.searchBook = function (searchQuery) {
	
}

//this function add a list of books to the DB
exports.addToDb = function (listOfBooksToAdd) {

    Book.find(function (err, books) {
        if (err) {
            console.log(err);
        } else {
            console.log(books.length);
            for (i = 0; i < books.length; i++) {
                for ( j = 0 ; j<listOfBooksToAdd.items.length ; j++) {							
                    for ( k = 0 ; k < listOfBooksToAdd.items[j].volumeInfo.industryIdentifiers.length ; k++) {								
                        for (l = 0 ; l < books[i].industryIdentifiers.length ; l++) {
                            console.log("Is marked with fromGoogle : "+listOfBooksToAdd.items[j].fromGoogle)
                            if ((books[i].industryIdentifiers[l].type === listOfBooksToAdd.items[j].volumeInfo.industryIdentifiers[k].type && books[i].industryIdentifiers[l].identifier === listOfBooksToAdd.items[j].volumeInfo.industryIdentifiers[k].identifier) || listOfBooksToAdd.items[j].fromGoogle) {
                                //console.log("yes");
                            } else {
                                listOfBooksToAdd.items[j].fromGoogle = true;
                                controllers.books.add(listOfBooksToAdd.items[j]);
                                //console.log("no");
                            }
                        }
                    }
                }
            }
        }
    })
}