// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var https = require('https');

var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
//COMMIT
var donothing;

require('./database/mongodb');

var Book = require('./models/book');
var User = require('./models/user');

var controllers = {
	books: require('./controllers/books'),
	auth: require('./controllers/auth'),
	users: require('./controllers/users')
};

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//middleware which verify if the token sended is rigth. Let some route free of checking
app.use(expressJWT({ secret: 'thisissecret'})
	.unless({ path: ['/api/login', '/api/signup', '/api/signup/checkalias']})); 

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
	console.log('Something is happening.');
	console.log(req);
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

//on routes that end in /login
//------------------------------------------------------
router.route('/login')
	
	/**
	 * Receive an alias and a password.
	 * Send back a token and a status '1' if the user exists and the password match 
	 * If found nothing, send back an error status and an error message
	 * Error status :
	 * - 2 : this alias doesn't exist
	 * - 3 : the password is invalid
	 * - 4 : no alias found in the request
	 * - 5 : no password found in the request
	 */
	.post(function (req, res) {
		
		var user = new User();
		if (!req.body.alias) {
			var response = new Object();
			response.status = '4';
			response.message = 'No alias found in the request';
			res.status(200).json(response);
			return;
		} else {
			controllers.users.getUserByAlias(req.body.alias, function (result) {
				user = result;
				console.log(user);
				if (user === null) {
					var response = new Object();
					response.status = '2';
					response.message = 'This alias doesn\'t exists';
					res.status(200).json(response);
					return;
				}
				if (!req.body.password) {
					var response = new Object();
					response.status = '5';
					response.message = 'No password found in the request';
					res.status(200).json(response);
					return;
				}
                if (controllers.auth.verifyPasswordsEquality(req.body.password, user.password)) {
					var token = jwt.sign({ alias: user.alias, userId: user._id}, 'thisissecret');
					var response = new Object();
					response.status = '1';
					response.message = 'Log In';
					response.token = token;
					res.status(200).json(response);
					return;
					/*
					var uncryptedToken = jwt.decode(token);
					console.log(uncryptedToken.alias);
					console.log("test");
					*/
                } else {
					var response = new Object();
					response.status = '3';
					response.message = 'The password is invalid';
					res.status(200).json(response);
					return;
                }
			});
		}
	});

//on routes that end in /signup
//---------------------------------------------------
router.route('/signup')
	.post(function (req, res) {
		
		if (req.body.addNew === 'true') {
			var encryptedNewPassword = controllers.auth.passwordEncryption(req.body.password);
			req.body.password = encryptedNewPassword;
			controllers.users.addUser(req.body);
			res.json('User added');
		}

	})

//on routes that end in /signup/checkalias
//---------------------------------------------------
router.route('/signup/checkalias')
	.get(function(req, res) {
		//console.log(req.query.test);
		var aliasToCheck = req.query.alias;
		if(users.getUserByAlias === null) {
			res.json("true");
		} else {
			res.json("false")
		}
	})

//on routes that end in /user
//---------------------------------------------------
router.route('/user')
	.get(function(req,res) {
		console.log(req.query);
		var token = req.query.token;
		/*
		var uncryptedToken = jwt.decode(token);
		console.log(uncryptedToken.alias);
		console.log("test");
		*/
		console.log(token);
		var uncryptedToken = jwt.decode(token);
		console.log(uncryptedToken.userId);
		controllers.users.getUserById(uncryptedToken.userId, function(user) {
			res.json(user);
		});
	})

//on routes that end in /book
//----------------------------------------------------
router.route('/book')

    // create a book (accessed at POST http://localhost:8080/api/book)
    .post(function (req, res) {

        var book = new Book();      // create a new instance of the Book model
        if (req.body.title) {
			book.title = req.body.title;	// set the books name (comes from the request)
		}
		
		// save the book and check for errors
        book.save(function (err) {
            if (err) {
				res.send(err);
			} else {
				
				res.json({ message: 'Book created!' });
			}   
        });

    })


// on routes that end in /books
// ----------------------------------------------------
router.route('/books')

	// get all the books (accessed at GET http://localhost:8080/api/books)
    .get(function (req, res) {
        Book.find(function (err, books) {
            if (err) {
				console.log(err);
				res.send(err);
			} else {
				res.json(books);
			}
        });
    });


// on routes that end in /books/search
// ----------------------------------------------------
router.route('/books/search')
	//search for a book with search terms (accessed at POST http://localhost:8080/api/books/search)
	.post(function (req, res) {
		
		//this function add a list of books to the DB
		var addToDb = function (listOfBooksToAdd) {

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
	
		
		//this function is called when the data have been take out from Google API
		var onEnd = function(toSend) {
			if(toSend.totalItems > 0) {
                console.log("Adding");
				books.addToDb(toSend);
				var listToSend = new Array;
				for (var m = 0; m < toSend.items.length ; m++) {
					listToSend.push(controllers.books.fromGoogleToDB(toSend.items[m]));
				}
				res.json(listToSend);
			} else {
				res.json("");
			}
				
		};
	
		function aContainsB (a, b) {
			return a.indexOf(b) >= 0;
		};
		
		
		//here we look to Google API to find a book. More info : https://developers.google.com/books/docs/v1/using#query-params
		if(req.body.inGoogle === 'true') {
			urlHost = 'www.googleapis.com';
			urlPath = '/books/v1/volumes?q=';

			googleApiKey = 'AIzaSyAtlI0XvpZpGkmR5MApALthEIvaTSjSssc';
			searchTerms = "";

			if(req.body.intitle) {
				searchTerms += "+intitle:";
				searchTerms += req.body.intitle;
			}
			if(req.body.inauthor) {
				searchTerms += "+inauthor:";
				searchTerms += req.body.inauthor;
			}
			if(req.body.inpublisher) {
				searchTerms += "+inpublisher:";
				searchTerms += req.body.inpublisher;
			}
			if(req.body.subject) {
				searchTerms += "+subject:";
				searchTerms += req.body.subject;
			}
			if(req.body.isbn) {
				searchTerms += "+isbn:";
				searchTerms += req.body.isbn;
			}
			if(req.body.lccn) {
				searchTerms += "+lccn:";
				searchTerms += req.body.lccn;
			}
			if(req.body.oclc) {
				searchTerms += "+oclc:";
				searchTerms += req.body.oclc;
			}
			
			//search for the maximum of books (40)
			searchTerms += "&maxResults=40";
			//searchTerms += "&langRestrict=fr";

			searchTerms += '&key=';
			searchTerms += googleApiKey;

			urlPath += searchTerms;
			
			var options = {
				host :  urlHost,
				port : 443,
				path : urlPath,
				method : 'GET'
			}
			var buffer = "",
				finalData,
				route;

			var getReq = https.request(options, function(result) {

				result.on('data', function(data) {
					buffer += data ;
				});

				result.on('end', function (){
					finalData = JSON.parse(buffer);
					onEnd(finalData);
				});

			});

			//end the request
			getReq.end();
			getReq.on('error', function(err){
				console.log("Error: ", err);
			});
		} else {
			
			
			var results = [];
			var intitle = "", inauthor = "", incategory = "";
			if(req.body.intitle){
				intitle = req.body.intitle;
				console.log(intitle);
			}
			if(req.body.inauthor){
				inauthor = req.body.inauthor;
				console.log(inauthor);
			}
			if(req.body.incategory){
				incategory = req.body.incategory;
				console.log(incategory);
			}
			
			Book.find(function(err,books) {
				if(err) {
					console.log(err);
					res.send(err);
				} else {
					if(intitle != "") {
						console.log("Go intitle");
						for(var i=0 ; i<books.length ; i++) {
							if(!aContainsB(books[i].title.toLocaleLowerCase(),intitle.toLocaleLowerCase())) {
								books.splice(i,1);
								i--;
							} 
						}
					}
					if(inauthor != "") {
						console.log("Go inauthor");
						for(var i=0 ; i<books.length ; i++) {
							if(books[i].authors){
								var authorInAuthorsList = false;
								for(var j=0 ; j<books[i].authors.length ; j++) {
									if(aContainsB(books[i].authors[j].toLocaleLowerCase(),inauthor.toLocaleLowerCase())) {
										authorInAuthorsList = true;
									}
								}
								if(!authorInAuthorsList) {
									books.splice(i,1);
									i--;
								}
							} else {
								books.splice(i,1);
								i--;
							}
							
						}
					} 
					
					if(incategory != "") {
						console.log("Go incategory");
						for(var i=0 ; i<books.length ; i++) {
							var categoryInCategoriesList = false;
							if(books[i].mainCategory && aContainsB(books[i].mainCategory.toLocaleLowerCase(),incategory.toLocaleLowerCase())) {
								categoryInCategoriesList = true;
							}
							if(books[i].categories) {
								for(var j=0 ; j<books[i].categories.length ; j++) {
									if(aContainsB(books[i].categories[j].toLocaleLowerCase(),incategory.toLocaleLowerCase())) {
										categoryInCategoriesList = true;
									}
								}
							}
							if(!categoryInCategoriesList) {
								books.splice(i,1);
								i--;
							}
							
						}
					}
					
					/*
					if(intitle != "" && inauthor != "") {
						var firstSearch = [];
						for(let i=0 ; i<books.length ; i++) {
							if(books[i].authors){
								for(let j=0 ; j<books[i].authors.length ; j++) {
									if(aContainsB(books[i].authors[j].toLocaleLowerCase(),inauthor.toLocaleLowerCase())) {
										firstSearch.push(books[i]);
									}
								}
							}
							
						}
						for(let i=0 ; i<firstSearch.length ; i++) {
							if(aContainsB(firstSearch[i].title.toLocaleLowerCase(),intitle.toLocaleLowerCase())) {
								results.push(firstSearch[i]);
							}
						}
						
					} else if (intitle != "" && inauthor === "") {
						for(let i=0 ; i<books.length ; i++) {
							if(aContainsB(books[i].title.toLocaleLowerCase(),intitle.toLocaleLowerCase())) {
								results.push(books[i]);
							}
						}
					} else if (intitle === "" && inauthor != "") {
						for(let i=0 ; i<books.length ; i++) {
							if(books[i].authors){
								for(let j=0 ; j<books[i].authors.length ; j++) {
									if(aContainsB(books[i].authors[j].toLocaleLowerCase(),inauthor.toLocaleLowerCase())) {
										results.push(books[i]);
									}
								}
							}
							
						}
					}
					*/
					
					res.json(books);
				}
			});
			
			/*
			var titleExpression = new RegExp(
				"" + intitle.split(" ").map(function(word) {
					return "(?=.*\\b"+word+ "\\b)"
				}).join("")+".+"
			);
			
			var query = { "title": titleExpression};
			console.log(expression);
			Book.find(query, function(err,books) {
				if(err) {
					console.log(err);
					res.send(err);
				} else {
					console.log(books.length);
					for(o=0; o < books.length ; o++) {
						console.log(books[i].title);
					}
					res.json(books);
				}
			});
			*/
		}	
	})

// on routes that end in /book/:book_id
// ----------------------------------------------------
router.route('/book/:book_id')

    // get the book with that id (accessed at GET http://localhost:8080/api/book/:book_id)
    .get(function(req, res) {
        Book.findById(req.params.book_id, function(err, book) {
            if (err) {
				res.send(err);
			} else {
				res.json(book);
			}           
        });
    })

	// update the book with this id (accessed at PUT http://localhost:8080/api/books/:book_id)
    .put(function(req, res) {

        // use our book model to find the book we want
        Book.findById(req.params.book_id, function(err, book) {

            if (err) {
				res.send(err);
			} else {
				book.title = req.body.title;  // update the books info

				// save the book
				book.save(function(err) {
					if (err) {
						res.send(err);
					} else {
						res.json({ message: 'Book updated!' });
					}
				});
			}
		});
    })

	// delete the book with this id (accessed at DELETE http://localhost:8080/api/books/:book_id)
    .delete(function(req, res) {
        Book.remove({
            _id: req.params.book_id
        }, function(err, book) {
            if (err) {
				res.send(err);
			} else {
				res.json({ message: 'Successfully deleted' });
			}
        });
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);