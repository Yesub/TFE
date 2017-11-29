var User = require('../models/user');
var crypto = require("crypto");
var algo = 'aes-256-ctr';
var secret = "aZdFg5P99Tru87";

exports.verifyPasswordsEquality = function (passwordFromClient, passwordFromDB) {
	if(passwordFromClient && passwordFromDB) {
		if(exports.passwordDecryption(passwordFromDB)===passwordFromClient) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

exports.passwordEncryption = function (password) {
	if (password) {
		var cipher = crypto.createDecipher(algo,secret);
		var crypted = cipher.update(password,'utf8','hex');
		crypted  += cipher.final('hex');
		return crypted;
	}
}

exports.passwordDecryption = function (password) {
	if(password) {
		var decipher = crypto.createDecipher(algo,secret)
		var dec = decipher.update(password,'hex','utf8')
		dec += decipher.final('utf8');
		return dec;
	}
}