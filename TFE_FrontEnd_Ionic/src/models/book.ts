export interface Book {
	title: string;
	subtitle: string;
    authors: [
       string //or ID of Author if we develop the author
    ];
    publisher: string; //or ID if we develop the publisher
    publishedDate: string;
    description: string;
    industryIdentifiers: [
       {
            type: string; //ex : ISBN_10 or ISBN_13
            identifier: string;
       }
    ];
    pageCount: string;
    dimensions: {
       height: string;
       width: string;
       thickness: string;
    };
    printType: string; //ex : BOOK
    mainCategory: string;
    categories: [
       string
    ];
	ratings: [//give the opportunity to rate the book, explain the rating
		{
			rating: string; //the level of rating
			comment: string;
			assessor: string; //_id from user
		}
	];
    averageRating: string;
    ratingsCount: string;
    imageLinks: {
       smallThumbnail: string;
       thumbnail: string;
       small: string;
       medium: string;
       large: string;
       extraLarge: string;
    };
    language: string;	
}