var User = require('../models/user');

exports.getUserByAlias = function (alias, callback) {
	if(alias) {
		User.find(function(err,users) {
			if(err) {
				callback(err);
			} else {
				function myLoopA(a) {
					if(a < users.length) {
						if(alias===users[a].alias) {
							callback(users[a]);
						}
						myLoopA(a+1);
					} else {
						callback(null);
					}

				}
				myLoopA(0);
			}
			
		});
	} else {
		callback(null);
	}
	
};

exports.addUser = function (fields) {
	User.create(fields, function (err) {
		if(err) {
			console.log(err);			
		} else {
			console.log("added");
			
		}
	});
};