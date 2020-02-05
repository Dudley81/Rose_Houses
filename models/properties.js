var mongoose = require("mongoose");

//schema setup
var propertySchema = new mongoose.Schema({
	name: String,
	image: String,
	rm1img: String,
	rm2img: String,
	rm3img: String,
	description: String,
	bookings: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref:"Book"
		}
	]
	
});

var Properties = mongoose.model("Properties", propertySchema);

module.exports = mongoose.model("Properties", propertySchema);