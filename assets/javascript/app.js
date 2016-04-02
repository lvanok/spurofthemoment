// hides the google map div until after the submit button is selected
$(document).ready(function(){
  $('#googleMapDiv').hide();
})
// FACEBOOK LOGIN API
// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the app know the current login status of the person. Full docs on the response object can be found in the documentation for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if hey are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
    }
  };
  // This function is called when someone finishes with the Login Button.  See the onlogin handler attached to it in the sample code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1729912430587543',
      cookie     : true,  // enable cookies to allow the server to access the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.5' // use graph api version 2.5
    });
    // Now that we've initialized the JavaScript SDK, we call FB.getLoginStatus().  This function gets the state of the person visiting this page and can return one of three states to the callback you provide.  They can be:
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into your app or not.
      // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };


  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  // Here we run a very simple test of the Graph API after login is successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
    });
  };
  function getUserInfo(){
    FB.login(function(response) {
      // handle the response
    }, {scope: 'user_likes, user_actions.music'});
    FB.api(
      '/me',
      'GET',
      {"fields":"music{genre,artists_we_like,name, picture{url}}"},
      function(response) {
        console.log(response);
      }
    );
  };

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
      zoom: 10
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
    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Band Name or Header</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Content</b>, also <b>more content</b>, is a content '
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 250
    });

    //event listener that calls addmarker() when the map is clicked
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
    google.maps.event.addListener(map, 'mouseover', function(event) {
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
          label: bitResponse[i].title,
        });
      
      //Attach click event to the marker.
      (function (marker, venueData) {
        google.maps.event.addListener(marker, 'click',function (e) {
          //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
          infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" +showData.title + "</div>");
          infoWindow.open(map, marker);
        });
      })(marker, venueData);
    }
  }

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
      };
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
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
    createArtistList();
    $('#userInput').val("");
    $('#googleMapDiv').show();

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

    main = $('<div class="panel panel-default"> <div class="panel-heading" id="#'+tableId+'">'+bitResponse[i].title+'</div><div class="panel-body"> <img src="'+bitResponse[i].artists[0].thumb_url+'"></div><ul id="#'+bodyId+'" class="list-group"> <li class="list-group-item"> Website: <a href="'+bitResponse[i].artists[0].website+'">'+bitResponse[i].artists[0].url+' </li> <li class="list-group-item">  </li></ul></div>');
    $(main).insertAfter(blankOutside);
    

  };

}
