var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res){
  console.log('get days route hit');
  models.Day.find(function(err, days){
    console.log('found days:', days);
    res.send(days);
  })

});

router.post('/', function(req,res){
  var dayNum = req.body.day_number;
  console.log('post day route hit');
  models.Day.create({day_number: dayNum}, function(err, day){
    console.log('mongoose made the day:', day);
    res.send(day);
  })
});

// router.post('/', function(req,res){
//   //...create day...
//   newday = new model({'day_number': req.body.dayId, 'hotels': req.body.hotel, 'restaurants': req.body.thingstodo, 'thingsToDo': req.body.thingsToDo})
//  //  dayNumber: thisButtonIsBlue;
//   res.json;
// });

// router.post('/:dayId/attractions',function(req,res){
  //...add an attraction to day...

// res.redirect('/')
// // models.findone({dayId: req.parms.attractionid}),function  (err, attraction) {
// //   // body...
// // }

// });

// router.get('/', function(req,res){
//   //...list all days...

// });

module.exports = router;