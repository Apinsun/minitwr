/*Mongoose model*/

var mongoose = require("mongoose");

module.exports = mongoose.model("umess-user",
	{
		firstName: String,
		surname: String,
		username: String,
		password: String,
		mail: String,
		additional: String,
		picture: { type: String, default: "default.png" },
	});
