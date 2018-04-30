require("dotenv").config();

// **---------REQUIRE DECLARATIONS---------**//

var keys = require("./key.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var dateFormat = require("dateformat");
var fs = require("fs");

// **---------SPOTIFY FUNCTION---------**//

var spotify = new Spotify(keys.spotify);

var getArtist = function(artist) {
  return artist.name;
};

var getSong = function(song) {
  spotify.search({ type: "track", query: song }, function(err, data) {
    if (err) {
      console.log("Error occurred: " + err);
      return;
    }
    // Do something with 'data'
    var songs = data.tracks.items;
    for (var i = 0; i < songs.length; i++) {
      var now = new Date(songs[i].album.release_date);
      console.log(i);
      console.log("Artist(s): " + songs[i].artists.map(getArtist));
      console.log("Song Name: " + songs[i].name);
      console.log("Preview Song: " + songs[i].preview_url);
      console.log("Album: " + songs[i].album.name);
      console.log("Released: " + dateFormat(now, "mmmm dS, yyyy"));
      console.log("------------------------------------------------");
    }
  });
};

// **---------READ FILE FUNCTION---------**//

var doWhatItSays = function() {
fs.readFile("random.txt", "utf8", function(error, data) {
  if (error) {
    return console.log(error);
  }
  // console.log(data);
  var dataArr = data.split(",");
  console.log(dataArr);
  if (dataArr.length == 2){
    pick(dataArr[0], dataArr[1]);
  } else if (dataArr.length == 1) {
    pick(dataArr[0]);
  }
});
}

// **---------OMDB FUNCTION---------**//

var getMovie = function(movieName) {
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
    }
    // console.log(body);
    console.log("Movie Name: " + JSON.parse(body).Title);
    console.log("Directed By: " + JSON.parse(body).Director);
    console.log("Main Actor(s): " + JSON.parse(body).Actors);
    console.log("Year Released: " + JSON.parse(body).Year);
    console.log("Country: " + JSON.parse(body).Country + " | " + "Language(s): " + JSON.parse(body).Language);
    console.log("The movie's Rating is: " + JSON.parse(body).Rated);
    console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("\n------------------------------------------------");
    console.log("\nPlot: " + JSON.parse(body).Plot);
  });
};
// **---------TWITTER FUNCTION---------**//

var getTweets = function() {
  var client = new Twitter(keys.twitter);
  

  var params = { screen_name: "Arob007x" };
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (!error) {
      // console.log(tweets);
      for (var i = 0; i < tweets.length; i++) {
        var now = new Date(tweets[i].created_at);
        console.log(" ");
        console.log(dateFormat(now, "mmmm dS, yyyy"));
        console.log(tweets[i].text);
      }
    }
  });
};

// **---SWITCH STATEMENT THAT CALLS EACH FUNCTION BASED ON CONDITION BEING MET---**//

var pick = function(caseData, functionData) {
  switch (caseData) {
    case "my-tweets":
      getTweets();
      break;
    case "spotify-this-song":
      getSong(functionData);
      break;
    case "movie-this":
      getMovie(functionData);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("LIRI does not know that!");
  }
};

var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
