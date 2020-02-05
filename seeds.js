var mongoose = require("mongoose");
var Property = require("./models/properties");
var Book     = require("./models/book");


var seeds = [
	{
		name: "4013 Joe Kerr Rd.",
		image: "https://images.unsplash.com/photo-1430285561322-7808604715df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		rm1img: "https://images.unsplash.com/photo-1570054417025-2fa787c4c8f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		rm2img: "https://images.unsplash.com/photo-1572891086295-6c1c7c476549?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		rm3img: "https://images.unsplash.com/photo-1512918580421-b2feee3b85a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Located near Johnston Rd. 3400sq feet home. WiFi, Cable, Washer and Dryer " 
	},

	{
		name: "11808 Provincetowne Dr.",
		image: "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		rm1img: "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		rm2img: "https://images.unsplash.com/photo-1560184897-502a475f7a0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		rm3img: "https://images.unsplash.com/photo-1577855132008-bbcbc2d444d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Located near Stonecrest Shopping Center. 3000sq feet home. Wifi, Cable, Washer and Dryer"
	},

	{
		name: "1032 Johnston Rd.",
		image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		rm1img:	"https://images.unsplash.com/photo-1565339553422-43e835dfb22d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		rm2img: "https://images.unsplash.com/photo-1571508602588-8fee05180aae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		rm3img: "https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "Located in Ballantyne area near Harris Teeter. 3250sq feet home. Wifi, Cable, Washer and Dryer"
	}
]


function seedDB(){
	Book.deleteMany({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed bookings")
	})
   //Remove all campgrounds
   Property.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
       
             //add a few campgrounds
            seeds.forEach(function(seed){
                Property.create(seed, function(err, property){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a property");
                        //create a comment
                        Book.create(
						{
							bookingFor: "James Turner",
							roomNum:"1",
							date_inn: "12/30/2019",
							date_out: "1/18/2020"
						}, function(err, book){
							if(err){
								console.log(err);
							} else {
								property.bookings.push(book);
								property.save();
							}
							
						});
                    }
                });
            });
    }); 
    //add a few comments
}
 
	
module.exports = seedDB;