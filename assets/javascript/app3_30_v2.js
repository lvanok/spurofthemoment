var pos = ""

var map;
   	//used to name the markers that will appear when user clicks
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;

    //initializes google map
    function initMap() {
      	var brooklyn = {lat: +40.6, lng: -74},
        map = new google.maps.Map(document.getElementById('googleMap'), {
          center: {lat: +40.663, lng: -73.982},
          zoom: 14
        });


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
            '<p><b>Content</b>, <p> more content here </p>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 250
        });


        //event listener that calls addmarker() when the map is clicked
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

        // this code is only adds a marker when you click on the map. we don't need it, but i am using it in case we need the format for something else
        // google.maps.event.addListener(map, 'click', function(event) {
        //   addMarker(event.latLng, map);
        // });

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
      };
    };

      
