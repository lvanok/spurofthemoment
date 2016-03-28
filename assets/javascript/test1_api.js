
//ajax FB call to get facebook id for bands within 10 mi radius. JSONP callsback to let us go thru access code.
$.ajax({url: "https://api.bandsintown.com/artists/" + [i] + "events/recommended?location=" pos + "&radius=10&app_id=RUCB&api_version=2.0&format=json",
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
