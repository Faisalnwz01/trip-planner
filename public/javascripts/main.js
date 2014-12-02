// console.log("hotels", all_hotels);
// console.log("thingsToDo", all_things_to_do);
// console.log("restaurants", all_restaurants);
var thisButtonIsBlue = 1;
var whichday = "Day 1"
$(document).ready(function() {
	var hotelsDropdown = $('select[name="hotel"]');

	all_hotels.forEach(function(hotel) {
		var listObj = $('<option></option>');
		listObj.text(hotel.name);
		listObj.appendTo(hotelsDropdown);
	});

	var thingsToDoDropdown = $('select[name="thing-to-do"]');

	all_things_to_do.forEach(function(thingToDo) {
		var listObj = $('<option></option>');
		listObj.text(thingToDo.name);
		listObj.appendTo(thingsToDoDropdown);
	});

	var restaurantsDropdown = $('select[name="restaurant"]');

	all_restaurants.forEach(function(restaurant) {
		var listObj = $('<option></option>');
		listObj.text(restaurant.name);
		listObj.appendTo(restaurantsDropdown);
	});
});
//////////////////////////////buttons
var buttonsArray = [{}];
$(function(){
    $('.addButton').on('click',function(){
        buttonsArray.push({});
        var thisButtonNumber = buttonsArray.length;
        var r= $('<button class=" idDay' + buttonsArray.length +'" type="button">Day ' + buttonsArray.length +'</button>');


      var klon = $( '#this-plan1' );
      klon.clone().attr('id', 'this-plan'+(buttonsArray.length) ).attr('class','plans').attr('style','display: none').insertAfter( klon ).appendTo('#days-container');




        r.on('click', function(evt){

          r.siblings().removeClass('btn-primary');
          r.addClass('btn-primary');
          $("#this-title" ).html('Day ' + thisButtonNumber);
          $('.plans').hide();
          $('#this-plan'+thisButtonNumber).show();
          thisButtonIsBlue = evt.target.getAttribute("class").substring(5,6);

     });
       $(r).appendTo('.btn-group');
     });
});



$(function(){
$('.idDay1').click(function(evt){
          $(this).siblings().removeClass('btn-primary');
          $(this).addClass('btn-primary');
      $("#this-title" ).html('Day 1');
      thisButtonIsBlue = 1;
     });
});

$(function(){
  $('.setbutton').on('click', function(){
    var selected = $("#hotel1 option:selected" ).text();
    selected = '<ul>' + selected + '</ul>'
    $(selected).appendTo('#this-plan'+thisButtonIsBlue+' #this-hotel');
  });
});

$(function() {
  $('.addbuttontodo').on('click', function(){
    var selected = $("#thingtodo option:selected" ).text();
    selected = '<ul>' + selected + '</ul>'
    $(selected).appendTo('#this-plan'+thisButtonIsBlue+ ' #these-things-to-do');
  });
});

$(function() {
  $('.addbuttonres').on('click', function(){
    var selected = $("#resturantadd option:selected" ).text();
    selected = '<ul>' + selected + '</ul>'
    $(selected).appendTo('#this-plan'+thisButtonIsBlue+' #these-restaurants');
  });
});






///////////////////////////end buttons

function initialize_gmaps() {

  // initialize new google maps LatLng object
  var myLatlng = new google.maps.LatLng(40.705786,-74.007672);

  // set the map options hash
  var mapOptions = {
    center: myLatlng,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // get the maps div's HTML obj
  var map_canvas_obj = document.getElementById("map-canvas");

  // initialize a new Google Map with the options
  var map = new google.maps.Map(map_canvas_obj, mapOptions);


  all_restaurants.forEach(function(restaurants) {
    // console.log(restaurants.place[0].location[1])
    var position = new google.maps.LatLng(restaurants.place[0].location[0], restaurants.place[0].location[1]);
     // var position = myLatlng;
    var marker = new google.maps.Marker({
    position: position,
    title:"Hello World!"
  });

  marker.setMap(map);
  });

  // Add the marker to the map

  // Add the marker to the map by calling setMap()
}

$(document).ready(function() {
  initialize_gmaps();
});


// make the addDay buttton add more buttons,
// make the add button after things to do slect each
