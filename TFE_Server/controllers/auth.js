var User = require('../models/user');
var crypto = require("crypto");
var algo = 'aes-256-ctr';
var secret = "aZdFg5P99Tru87";

exports.log = function (passwordFromClient, passwordFromDB) {
	if(passwordFromClient && passwordFromDB) {
		/*
		console.log("Password before encryption : "+password);
		var ciphertext = CryptoJS.AES.encrypt(password, secret);
		console.log("Password after encryption : "+ciphertext);
		*/
		
		/*
		var bytesPasswordFromDB = CryptoJS.AES.decrypt(passwordFromDB.toString(), secret);
		console.log(bytesPasswordFromDB);
		var decryptedPasswordFromDB = bytesPasswordFromDB.toString(CryptoJS.enc.Utf8);
		console.log(decryptedPasswordFromDB);
		
		var bytespasswordFromClient = CryptoJS.AES.decrypt(passwordFromClient.toString(), secret);
		console.log(bytespasswordFromClient);
		var decryptedpasswordFromClient = bytespasswordFromClient.toString(CryptoJS.enc.Utf8);
		console.log(decryptedpasswordFromClient);
		
		if(bytespasswordFromClient === bytesPasswordFromDB) {
			return true;
		} else {
			return false;
		}
		*/
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