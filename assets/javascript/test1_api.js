var userData = new Firebase('https://spurofthemoment.firebaseio.com/');
var pos = "";

// FACEBOOK LOGIN API
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
      getUserInfo();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
         // The person is not logged into Facebook, so we're not sure if
         // they are logged into this app or not.
         document.getElementById('status').innerHTML = 'Please log ' +
           'into Facebook.';
    }
};

     // This function is called when someone finishes with the Login
     // Button.  See the onlogin handler attached to it in the sample
     // code below.
    function checkLoginState() {
        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });
    };

window.fbAsyncInit = function() {
     FB.init({
       appId      : '1729912430587543',
       cookie     : true,  // enable cookies to allow the server to access 
                           // the session
       xfbml      : true,  // parse social plugins on this page
       version    : 'v2.5' // use graph api version 2.5
    });
     // Now that we've initialized the JavaScript SDK, we call 
       // FB.getLoginStatus().  This function gets the state of the
       // person visiting this page and can return one of three states to
       // the callback you provide.  They can be:
       //
       // 1. Logged into your app ('connected')
       // 2. Logged into Facebook, but not your app ('not_authorized')
       // 3. Not logged into Facebook and can't tell if they are logged into
       //    your app or not.
       //
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
       // Here we run a very simple test of the Graph API after login is
        // successful.  See statusChangeCallback() for when this call is made.
    function testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
            console.log('Successful login for: ' + response.name);
            document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
        });
    };
    function getUserInfo(){
      FB.api('/me',function(response){
        console.log(response)
      });
          // {"fields":"music{genre,artists_we_like,name, picture{url}}"},
          // function(response) {
          //     console.log(fields.music.genre + fields.music.name + fields.music.artists_we_like + fields.music.picture);
         //   }
        // );
    };


//GOOGLE MAPS SCRIPT
var map;
    //used to name the markers that will appear when user clicks
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;

    //creates my center on the map
    myCenter = new google.maps.LatLng(40.6, -74);

    //initializes google map
    function initMap() {
        var brooklyn = {lat: +40.6, lng: -74},
        map = new google.maps.Map(document.getElementById('googleMap'), {
          center: {lat: +40.663, lng: -73.982},
          zoom: 14
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
            '<p><b>Content</b>, also <b>more content</b>, is a content ' +
            'sandstone rock formation in the southern part of the '+
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
            'south west of the nearest large town, Alice Springs; 450&#160;km '+
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
            'features of the Uluru - Kata Tjuta National Park. Uluru is '+
            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
            'Aboriginal people of the area. It has many springs, waterholes, '+
            'rock caves and ancient paintings. Uluru is listed as a World '+
            'Heritage Site.</p>'+
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

        google.maps.event.addListener(map, 'click', function(event) {
          addMarker(event.latLng, map);
        });

        // Add a marker at the center of the map.
        addMarker(brooklyn, map);
      

      // Adds a marker to the map.
      function addMarker(location, map) {
        // Add the marker at the clicked location, and add the next-available label
        // from the array of alphabetical characters.
        var marker = new google.maps.Marker({
          position: location,
          label: labels[labelIndex++ % labels.length],
          map: map
        });
      }

      

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }
  }
//ajax FB call to get facebook id for bands within 10 mi radius. JSONP callsback to let us go thru access code.
$.ajax({url: "https://api.bandsintown.com/artists/" + [Metallica] + "events/recommended?location=" new+yorkNY + "&radius=10&app_id=RUCB&api_version=2.0&format=json",
           jsonp: "callback",

           dataType: "jsonp",

           data: {
               q: "name",
               format: "json"
           },
       
//lvok
//variable bandId includes an array within a method to collect fb user favorites using id of the band likes.
var bandId = {
 "data":{
 "paging": {
   "cursors": {
     "before": "MjA2MDQ5NTk1MTEx",
     "after": "MjUwOTg0NzU1NDQZD"
   },
   "next": "https://graph.facebook.com/v2.5/2688891624776/music?access_token=CAACEdEose0cBAARmskydMozFXNkbHWCHfQ8zDJhg3O5EALliHnDcdb3zeAo3Xj51I5VZA8IissFpjlQes09Ce6idC20eMelG9tAMQvu9jMZCKmAxYwQCNuwU2E7wCNFU1gQVatAyP1i4QCWfn69SLECcxRqOrbGdrMeQQRJKHZAmS3mLDLwgkr8v6lZBxmupcSMHMidJZAv4RoanjUDOW&pretty=0&fields=id%2Cname%2Cgenre&limit=10&after=MjUwOTg0NzU1NDQZD"
 }
   [
   {
     "id": "206049595111",
     "name": "Valley Lodge",
     "genre": "Rocking Rock Music"
   },
   {
     "id": "159180840907101",
     "name": "Honoka & Azita"
   },
   {
     "id": "100187036701614",
     "name": "Echo Black",
     "genre": "Rock/Pop/Industrial"
   },
   {
     "id": "426647347507920",
     "name": "NDE Records"
   },
   {
     "id": "10150119827820321",
     "name": "PIEBALD",
     "genre": "Enviro-rock"
   },
   {
     "id": "173147976161053",
     "name": "My Finest Regards",
     "genre": "Progressive/Hardcore"
   },
   {
     "id": "134870849873870",
     "name": "Brothertiger",
     "genre": "Electronic"
   },
   {
     "id": "206711139402269",
     "name": "tide/edit",
     "genre": "Instrumental"
   },
   {
     "id": "20355427272",
     "name": "Weezer",
     "genre": "Alternative"
   },
   {
     "id": "25098475544",
     "name": "Foo Fighters",
     "genre": "Rock"
   }
 ]}
}
console.log(bandId.data[0].id);
console.log(bandId.data[1].name);
console.log(bandId.data[2].genre);


//function to use for loop to loop over an array that stores the band info.
<p id="demo"></p>

function getBandsByID() {
    var text = "bandId.data[id] ";
    var i = " ";
    var text1 = "bandId.data[name] ";
    var text2 = "bandId.data[genre] ";
    var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

//for loop over bandId and gather the name, genre & venue, if any.(not any in this example)

    for (i in bandId.data[0].id) {
        text += "The band id is " + i + "<br>";
        text1 += "The band name is " + i + "<br>";
        text2 += "The band genre is " + i + "<br>";

    }
    document.getElementById("demo").innerHTML = text;

}

//test stuff

// $return = '';
// $bands = $facebook-api('/me/bands');
// if (!empty($bandId['data'])) {
//     $size = variable_get('facebook_graph_pic_size_nodes','square');
//     $protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https' : 'http';
//     foreach ($bandId.data['id'] as $bandId.data[]) {
//         $fbid = $bandId.data['id'];
//         $bandId.data[$fbid]=$facebook->api('/'.$fbid.'/likes'); 
//         $fbname = $bandId.data['name'];
//         $fbgenre = $bandId.data['genre'];
//         $path = $protocol . '://graph.facebook.com/' . $fbid . '/picture?type=' . $size;
//         $image = theme('image', array('path' => $path, 'alt' => $fbname));

//         $like = false;
//         foreach($bandId.data['id'] as $like) {
//             if($like['id'] == '184759054887922') { // maybe $like->id will have to be used instead...use artists genre id
//                 $like = true;
//                 break;
//             }
//         }


//         if (!$like) {
//             $return bands= '<div class="fimage">'.$image.'</div>';
//             $link = '<a href="'.$protocol . '://www.facebook.com/profile.php?id='.$fbid.'" target="_blank">'.$fbname.'</a>';    
//             $return bands= '<div class="flink">'.$link.'</div>';
//         }
//     }
//     echo $return;
// }
