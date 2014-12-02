var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
// find everything in the database
// send to swig with the correct names

// nested callback approach
router.get('/', function(req, res) {
	models.Hotel.find(function(err, hotels) {
		models.Restaurant.find(function(err, restaurants) {
			models.ThingToDo.find(function(err, thingsToDo) {
				res.render('index', {
					hotels: hotels,
					restaurants: restaurants,
					things_to_do: thingsToDo
				});
			});
		});
	});
});



// // next() chaining approach
// router.get('/',
// 	function(req, res, next) {
// 		models.Hotel.find(function(err, hotels) {
// 			req._hotels = hotels;
// 			next();
// 		});
// 	},
// 	function(req, res, next) {
// 		models.Restaurant.find(function(err, restaurants) {
// 			req._restaurants = restaurants;
// 			next();
// 		});
// 	},
// 	function(req, res, next) {
// 		models.ThingToDo.find(function(err, thingsToDo) {
// 			req._thingsToDo = thingsToDo;
// 			next();
// 		})
// 	},
// 	function(req, res) {
// 		res.render('index', {
// 			hotels: req._hotels,
// 			restaurants: req._restaurants,
// 			things_to_do: req._thingsToDo
// 		});
// 	}
// );

module.exports = router;
