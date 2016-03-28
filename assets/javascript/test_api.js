$.ajax({
           url: "https://api.bandsintown.com/artists/fbid_" + [i] + "events/recommended?location=" pos + "&radius=10&app_id=RUCB&api_version=2.0&format=json",

           jsonp: "callback",

           dataType: "jsonp",

           data: {
               q: "name",
               format: "json"
           },

var testID ={
 "data": [
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
 ],
 "paging": {
   "cursors": {
     "before": "MjA2MDQ5NTk1MTEx",
     "after": "MjUwOTg0NzU1NDQZD"
   },
   "next": "https://graph.facebook.com/v2.5/2688891624776/music?access_token=CAACEdEose0cBAARmskydMozFXNkbHWCHfQ8zDJhg3O5EALliHnDcdb3zeAo3Xj51I5VZA8IissFpjlQes09Ce6idC20eMelG9tAMQvu9jMZCKmAxYwQCNuwU2E7wCNFU1gQVatAyP1i4QCWfn69SLECcxRqOrbGdrMeQQRJKHZAmS3mLDLwgkr8v6lZBxmupcSMHMidJZAv4RoanjUDOW&pretty=0&fields=id%2Cname%2Cgenre&limit=10&after=MjUwOTg0NzU1NDQZD"
 }
}
console.log(testId.data.id);
console.log(testId.data.name);
console.log(testId.data.genre);

<button onclick="getBandsByID()">Try it</button>

<p id="demo"></p>

<script>
function getBandsByID() {
    var text = "data.id ";
    var i;
    for (i = 0; i < 5; i++) {
        text += "The band is " + i + "<br>";
    }
    document.getElementById("demo").innerHTML = text;

}
</script>
<div class="container">
  <h2>Basic Table</h2>
  //.table class adds basic styling (light adding and only horizontal dividers) to a table
  <p></p>            
  <table class="table">
    <thead>
      <tr>
        <th>Band id</th>
        <th>Band Name</th>
        <th>Genre</th>
      </tr>
    </thead>
    <tbody>
      <tr>
         <!-- Example Movie 1 -->
        <td id="club-name"></td>
        <td>address:  </td>
        <td>BLAH</td>
      </tr>
      <tr>
        <td>BLAH</td>
        <td>BLAH</td>
        <td>BLAH</td>
      </tr>
      <tr>
        <td>BLAH</td>
        <td>BLAH</td>
        <td>BLAH</td>
      </tr>
    </tbody>
  </table>
</div>
// //note to Lisa: check out movie homework and pull [i] from FB developer
// url: queryURL + "GET"})
//   $(".artist").html("Artist:   " + response.artist) method: 'GET')

//                success: function( response ) {
//                console.log( response ); 
//            }
//        });




// // Based on the queryTerm we will create a queryURL 

// var queryURLBase = "http://api.bandsintown.com/artists/mbid_65f4f0c5-ef9e-490c-aee3-909e7ae6b2ab?format=xml&api_version=2.0&app_id=RCBC_JC";


// // "http://api.bandsintown.com/artists/name/events.format"
// // Array to hold the various artists
// var artistCounter = 0;

// // FUNCTIONS
// // ==========================================================

// var favoriteband = ['98 degrees', 'foo fighters', 'skillrex'];

// var queryURL = "";

// $.ajax({url: queryURL + "GET"})
//  	$(".artist").html("Artist:   " + response.artist) method: 'GET')

//  .done(function(response) {

//  	console.log(response);

// // This runQuery function expects two parameters (the number of articles to show and the final URL to download data from)
// function runQuery(artists, queryURL){

// 	// The AJAX function uses the URL and Gets the JSON data associated with it. The data then gets stored in the variable called: "NYTData"
// 	$.ajax({url: queryURL, method: "GET"}) 
// 		.done(function(BandData) {

// 	console.log(BandData);
// 	}
// });