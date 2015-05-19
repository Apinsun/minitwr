/*Mongoose model*/

var mongoose = require("mongoose");

module.exports = mongoose.model("im",
	{
		firstName: String,
		surname: String,
		username: String,
		imtext: String,
		date: String,
		picture: { type: String, default: "default.png" },
	});
