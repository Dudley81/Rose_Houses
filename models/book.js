var mongoose = require("mongoose");

var bookSchema = mongoose.Schema({
	bookingFor: String,
	phoneNum: String,
	roomNum: String,
	date_inn: String,
	date_out: String
});

module.exports = mongoose.model("Book", bookSchema);