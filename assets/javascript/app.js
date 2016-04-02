// hides the google map div until after the submit button is selected
$(document).ready(function(){
  $('#googleMapDiv').hide();
})

  //prevents googlemaps and create tab function from running until the ajax call is complete 
$(document).ajaxComplete(function(){
    createTable();
})
//GOOGLE MAPS SCRIPT
  // global variable for position. this will end up storingthe user's position
  var pos = "";


  var map;
  //used to name the markers that will appear when user clicks
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var labelIndex = 0;

  // //creates my center on the map
  // myCenter = new google.maps.LatLng(40.6, -74);

  //initializes google map
  function initMap() {
    var brooklyn = {lat: +40.6, lng: -74},
    map = new google.maps.Map(document.getElementById('googleMap'), {
      center: {lat: +40.663, lng: -73.982},
      zoom: 10,
    });
    //info window that shows current location
    var infoWindow = new google.maps.InfoWindow({map: map});
    marker = new google.maps.Marker({
      map: map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: {lat: 40.663, lng: -73.982}    
    });
    marker.addListener('click', toggleBounce);

    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
    var contentString = ""

    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 250
    });

    //event listener that calls addmarker() when the map is clicked
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
    google.maps.event.addListener(map, 'click', function(event) {
      addMarker(event.latLng, map);
    });

    // // Add a marker at the center of the map.
    // addMarker(brooklyn, map);  

    // Adds a marker to the map.
    function addMarker(location, map) {
      // Add the marker at the clicked location, and add the next-available label from the array of alphabetical characters.
      for (var i = 0; i < bitResponse.length; i++) {
        venueData = bitResponse[i].venue;
        showData = bitResponse[i];
        myLatlng = new google.maps.LatLng(venueData.latitude, venueData.longitude);
        marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          label: venueData.name,
        });
      
      //Attach click event to the marker.
      (function (marker, venueData) {
        google.maps.event.addListener(marker, 'click',function (e) {
          //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
          infoWindow.setContent("<div class =\'" + "infoPane" + "\'' style = 'width:200px;min-height:40px'>" +"<h1><b>"+ venueData.name + "</h1></b></div>");
          infoWindow.open(map, marker);
        });
      })(marker, venueData);
    }
  }

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      // pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      // map.setCenter(pos);
      pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
      };
      latPos = pos.lat;
      lngPos = pos.lng;
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
      center: ({lat: latPos, lng: lngPos});
    }, 
    function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
      
  function handleLocationError(browserHasGeolocation,infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
    }
  }


// BANDS IN TOWN API



// the following two functions work, but for some reason, they only work after I put addToArray() in the conosle. they don't work automatically

// all band names get pushed into this array when addToArray() is called. we may not need to use this since I figured out how to store the entire object, but i left it in
var bands = []

// all venue lat and lons and event names are stored in these next two. same deal as above...might not need it now that i figured out how to store the whole object, but i left it in.
var venueLatLon = []
var venueNames = []

// this variable is important, it stores the ENTIRE response from bands in town
var bitResponse = ''

// the following two variables will store the ENTIRE object for both artists and venues. all fields can be accessed through these. 
var midstepArtists = []
var midstepLocations = []
var otherInfo = []

// still working with this one, playing around with it, ignore it for now.
var mapLongLat

  var userInput = ''

  $('#submitButton').on('click', function(){
    userInput= $("#userInput").val().trim();
    $('#userInput').val("");
    $('#googleMapDiv').show();
    $('#photoCarousel').hide();

    var queryURL = "https://api.bandsintown.com/artists/" + userInput + "/events/recommended?location="+pos.lat + "," + pos.lng + "&radius=30&only_recs=false&app_id=RUCB&api_version=2.0&format=json";

    $.ajax({

      userInput: userInput,
   
      url: queryURL,

      jsonp: "callback",

      dataType: "jsonp",

      data: {
        q: "name",
        format: "json"
      },

      success: function( response ) {

        bitResponse = response;
        console.log(bitResponse); 
        addToArray();

      },
    })
    return false;
  });

      function addToArray(){  
        for(var i = 0; i < bitResponse.length; i++){
           //pushes all other info from object to the other info array
           $(otherInfo).push(bitResponse[i]); 

            // pushes the name and lat long of the venues into an array stored in a global variable

           $(venueNames).push(bitResponse[i].venue.name);

           $(midstepLocations).push(bitResponse[i].venue);

           $(venueLatLon).push("lat:"+bitResponse[i].venue.latitude + " lon:" + bitResponse[i].venue.longitude);



           // second for loop for the artist information

           for(var j = 0; j < bitResponse[i].artists.length; j++ ){

            // after spending time trying to get the names to push into array, got it to work, but decided to push the entire artist object into an array for the global variable called "midstep"

            $(midstepArtists).push(bitResponse[i].artists[j]);

           $(bands).push(bitResponse[i].artists[j].name);

           };

    };
};




//code to make a list of user inputs just so i can see that it's working without console logging it
function createArtistList(){
  var artist = $('<div>');
      artist.addClass('user_input');
      artist.text(userInput);
      $(".userList").append(artist);
}

//code to add information and create the table
var tablePrefix = 'table';
var tableId = '';
var labelPrefix = 'listItem';
var labelId = '';

function createTable(){
  for(var i=0; i < bitResponse.length; i++){

    //creates the panel for the table
    tableId = tablePrefix + i;
    //this creates the id for the body of the table
    bodyId = labelPrefix +i;

    blankOutside = $('<div></div>');
    $('#table').append(blankOutside);

    main = $('<div class="panel panel-default"> <div class="panel-heading" id="#'+tableId+'">'+bitResponse[i].title+'</div><div class="panel-body"> <img src="'+bitResponse[i].artists[0].thumb_url+'"></div><ul id="#'+bodyId+'" class="list-group"> <li class="list-group-item"> Website: <a href="'+bitResponse[i].artists[0].website+'">'+bitResponse[i].artists[0].url+' </a> </li> <li class="list-group-item">'+bitResponse[i].formatted_datetime+' </li> <li class="list-group-item"> '+bitResponse[i].venue.name+' <br> '+bitResponse[i].venue.city+', '+bitResponse[i].venue.region+' </li> <li class="list-group-item"> Get Tickets: <a href="'+ bitResponse[i].ticket_url +'"> '+bitResponse[i].ticket_type+' </a> </li> </ul></div>');
    $(main).insertAfter(blankOutside);
    

  };

}