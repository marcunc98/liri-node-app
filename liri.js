require("dotenv").config();

var spotifyMusic = require("spotify");

var keys = require("./key.js");

var spotify = new Spotify(keys.spotify);


spotify.search({ type: "track", query: "Whatever it Takes" }, function(err,data) {
  if (err) {
    console.log("Error occurred: " + err);
    return;
  }
  // Do something with 'data'
  console.log(data);
});


