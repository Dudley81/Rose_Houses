var express = require("express");
var router = express.Router();
var Properties = require("../models/properties")
var Book = require("../models/book")

router.get("/", function(req, res){
	
	//get all properties from DB
	Properties.find({}, function(err, allProperties){
		if(err){
			console.log(err);
		} else {
			res.render("properties/properties", {properties: allProperties, currentUser: req.user});
		}
	});
		
});

router.get("/:id", function(req, res){
	Properties.findById(req.params.id).populate("bookings").exec(function(err, foundProperty){
	if(err){
		console.log(err);
	} else{
		res.render("properties/show", {property: foundProperty});
	}
	});
	
});

//Book a room route
router.get("/:id/bookings/new", isLoggedIn, function(req, res){
//find property by id
	Properties.findById(req.params.id, function(err, foundProperty){
		if(err){
			console.log(err);
		} else {
			res.render("bookings/new", {property: foundProperty});
		}
	})
});

router.post("/:id/bookings", function(req, res){
	//look up property with id
	Properties.findById(req.params.id, function(err, property){
		if(err){
			console.log(err);
			res.redirect("/properties");
		} else {
			Book.create(req.body.book, function(err, book){
				if(err){
					console.log(err);
				} else {
					property.bookings.push(book);
					property.save();
					res.redirect('/properties/' + property._id);
				}
			});
			
			
		}
	});
});

// router.put("/:id", function(req, res){
// 	//find and update the correct property
// 	Properties.findByIdAndUpdate(req.params.id, req.body.property, function(err, updatedProperty){
// 		if(err){
// 			res.redirect("/properties");
// 		}else {
// 			res.redirect("/properties/" + updatedProperty._id);
// 		}
// 	});
	
// });

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


module.exports = router;