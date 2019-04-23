//.env file
require("dotenv").config();
//link to key page
const keys = require("./keys.js");

//npm packages
const fs = require("fs");
const axios = require("axios");
const moment = require("moment");



let action = process.argv[2];
// let inputs = process.argv[3];
let inputs = process.argv.slice(3).join(" ");

// initialize spotify
const Spotify = require('node-spotify-api')
const spotify = new Spotify(keys.spotify);

// to capture user command line input
switch (action) {
  case "concert-this":
  bands(inputs);
    break;

  case "spotify-this-song":
    spotifySearch (inputs);
    break;
  case "movie-this":
  imdbMovie(inputs);
    break;
  case "do-what-it-says":
    doThis(inputs);
    break;
  default:
    return "You don't know how to use!";
    break;
    
}

//concert-this run a request with axios to Bands in Town API Artist Events 
function bands(artist) {
  let bandsUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=3ee50028542b417d933591326b378b4f";
  console.log(bandsUrl);

  axios.get(bandsUrl).then(
    function(response) {
      console.log(typeof response.data);
      if (response.data.includes("error")){
        return console.log("no concerts found");
      }
      console.log(`Artist: ${artist}
Venue: ${response.data[0].venue.name}
Location: ${response.data[0].venue.country}
Date: ${moment(response.data[0].datetime).format("MM/DD/YYYY")}

==============

`);
    });

}


//Spotify-api spotify.request sent the search request
function spotifySearch (){
  console.log(`============== Search for....${inputs}`);
  // spotify search query format
  spotify
    .search({
      type: "track", 
      query: inputs, 
      limit: 1
    })
    //.then(function(error, data) {
      .then(function(response){
        console.log(response);
        console.log(`......Song Info.....
Artist: ${response.tracks.items[0].artists[0].name}
Song: ${response.tracks.items[0].name}
Link: ${response.tracks.items[0].external_urls.spotify}
Album: ${response.tracks.items[0].album.name}

======================= `);


      }) // error
      .catch(function(err){
        return console.log(err);
      });


}

// request omdb api with axios
function imdbMovie(movieName){
  if (!movieName){
    movieName = "The Proposal";
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  // request with axios to the queryUrl
  axios.get(queryUrl).then(
    function(response) {
      console.log(response);

      if (!movieName){
        movieName = "The Proposal";
      }
      //movie's data
      console.log(`Title: ${response.data.Title}
Year: ${response.data.Year}
Rated: ${response.data.imdbRating}
Country: ${response.data.Country}
Plot: ${response.data.Plot}
Actors: ${response.data.Actors}
Language: ${response.data.Language}
Rotten Tomatoes: ${response.data.Ratings[1].Value}

    ==================

    `);

    }
  );
}
//build in readfile and split methods to access random.txt.
function doThis() {

  fs.readFile("random.txt", "utf8", function(err, data){
    var txt = data.split(",");
    // reassign inputs variable
    inputs = txt[1];
    console.log(data);
    if (err) {
      return console.log(err);
    }
    spotifySearch();
  });
}