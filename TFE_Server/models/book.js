// app/models/book.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ObjectId 	 = mongoose.Schema.Types.ObjectId;

var BookSchema   = new Schema({
    title: { type: String, required: false },
	subtitle: { type: String, required: false },
    authors: [
       { type: String, required: false } //or ID of Author if we develop the author
    ],
    publisher: { type: String, required: false }, //or ID if we develop the publisher
    publishedDate: { type: String, required: false },
    description: { type: String, required: false },
    industryIdentifiers:[{
            type: { type: String, required: false }, //ex : ISBN_10 or ISBN_13
            identifier: { type: String, required: false }
    }],
    pageCount: { type: String, required: false },
    dimensions: {
       height: { type: String, required: false },
       width: { type: String, required: false },
       thickness: { type: String, required: false },
    },
    printType: { type: String, required: false }, //ex : BOOK
    mainCategory: { type: String, required: false },
    categories: [
       { type: String, required: false }
    ],
	ratings: [//give the opportunity to rate the book, explain the rating
		{
			rating: { type: String, required: false }, //the level of rating
			comment: { type: String, required: false },
			assessor: { type: ObjectId, required: false }, //_id from user
		}
	],
    averageRating: { type: String, required: false },
    ratingsCount: { type: String, required: false },
    imageLinks: {
       smallThumbnail: { type: String, required: false },
       thumbnail: { type: String, required: false },
       small: { type: String, required: false },
       medium: { type: String, required: false },
       large: { type: String, required: false },
       extraLarge: { type: String, required: false }
    },
    language: { type: String, required: false }	
});

module.exports = mongoose.model('Book', BookSchema);