/*Mongoose model*/

var mongoose = require("mongoose");

module.exports = mongoose.model("Utilisateur",
	{
		username: String,
		password: String,
		mail: String,
		additional: String,
	});
