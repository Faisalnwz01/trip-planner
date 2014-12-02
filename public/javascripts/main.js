  // console.log("hotels", all_hotels);
  // console.log("thingsToDo", all_things_to_do);
  // console.log("restaurants", all_restaurants);
  var thisButtonIsBlue = 1;
  var attraction_id = 0;
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
          var r= $('<button class="idDay' + buttonsArray.length +'" type="button">Day ' + buttonsArray.length +'</button>');


        var klon = $( '#this-plan1' );
        klon.clone().attr('id', 'this-plan'+(buttonsArray.length) ).attr('class','plans').attr('style','display: none').insertAfter( klon ).appendTo('#days-container');




          r.on('click', function(evt){

            thisButtonIsBlue = evt.target.getAttribute("class").substring(5,6);
            r.siblings().removeClass('btn-primary');
            r.addClass('btn-primary');
            $("#this-plan"+ thisButtonIsBlue+ " #this-title" ).html('Day ' + thisButtonIsBlue);
            $('.plans').hide();
            $('#this-plan'+thisButtonNumber).show();

       });
         $(r).appendTo('.btn-group');
       });
  });



  $(function(){
  $('.idDay1').click(function(evt){
            $(this).siblings().removeClass('btn-primary');
            $(this).addClass('btn-primary');
        $("#this-plan1 #this-title" ).html('Day 1');
            $('.plans').hide();
            $('#this-plan1' ).show();
        thisButtonIsBlue = 1;
       });
  });

  $(function(){
    $('.setbutton').on('click', function(){
       var map = initialize_gmaps();
      var selected = $("#hotel1 option:selected" ).text();
      selected = '<ul>' + selected + '</ul>'
      $(selected).appendTo('#this-plan'+thisButtonIsBlue+' #this-hotel');


      // attraction_id++;
      // writeVisitToServer(attraction_id, thisButtonIsBlue, 'H');
      // $.post( "/day/" + dayId + "/attractions", $( '#this-plan'+thisButtonIsBlue+).serialize() );
    });
  });

  $(function() {
    $('.addbuttontodo').on('click', function(){
      var selected = $("#thingtodo option:selected" ).text();
      selected = '<ul>' + selected + '</ul>'
      $(selected).appendTo('#this-plan'+thisButtonIsBlue+ ' #these-things-to-do');
       attraction_id++;
      writeVisitToServer(attraction_id, thisButtonIsBlue, 'T');
    });
  });

  $(function() {
    $('.addbuttonres').on('click', function(){
      var selected = $("#resturantadd option:selected" ).text();
      selected = '<ul>' + selected + '</ul>'
      $(selected).appendTo('#this-plan'+thisButtonIsBlue+' #these-restaurants');
      attraction_id++;
      writeVisitToServer(attraction_id, thisButtonIsBlue, 'R');
    });
  });






  ///////////////////////////end buttons, map starts

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

// this happens when the page loads (because this script loads)
// get the days from the db
$.get( '/day/', function receivedDays ( days ) {
  if (days.length > 0) {
    console.log(days);
    // display the list
    // set current day to day1 in list
    // display the events for day 1
  } else {
    console.log('got no days!!!!')
    $.post('/day/', {day_number: 8}, function makeDay (day){
      console.log('made a day: ', day);
    })
    // make currentSelectedDay = day;
    // display list of days ( = day1)
  };
});

  function writeVisitToServer(attraction_id, dayId, type_of_place, pHotel, pThing, pRestaurant) {
  var post_data = {
    attraction_id: attraction_id,
    attraction_type: type_of_place,
    hotel: pHotel,
    thingToDo: pThing,
    restaurant: pRestaurant
  };

  // the callback function below will be called if this request completes successfully.
  // the server's response to this request is passed into this callback function as "responseData"

  var post_callback = function (responseData) {
    //... what to do when done...
  };

  // jQuery Ajax call
  $.post( "/day/" + dayId + "/attractions", post_data, post_callback);
}

  $(document).ready(function() {
    initialize_gmaps();
  });


  // make the addDay buttton add more buttons,
  // make the add button after things to do slect each
