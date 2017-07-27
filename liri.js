var Twitter = require('twitter');
var keyInfo = require('./keys.js');
var Spotify = require('node-spotify-api');
var inputString = process.argv;
var request = require("request");
var fs = require("fs");
var inquirer = require("inquirer");

// takes user input variables to use in node
var needInfo = inputString[2];
var needInfoTwo = inputString[3];


// Twitter portion
var client = new Twitter({
 consumer_key: keyInfo.twitterKeys.consumer_key,
 consumer_secret: keyInfo.twitterKeys.consumer_secret,
 access_token_key: keyInfo.twitterKeys.access_token_key,
 access_token_secret: keyInfo.twitterKeys.access_token_secret
});

if (needInfo === "my-tweets") 
{
var params = {
	screen_name: 'mollymickey722',
	count: 20,
	result_type: 'recent'
};

// takes the unser info and query to Twitter for the last 20 tweets
client.get('statuses/user_timeline', params, function(error,tweets,response){
	if (!error) {
		
		 var i = 0;
		 while (tweets[i] != null && i < 21) 
		 {
		 		console.log("Tweet " + i + " On "+tweets[i].created_at + " This was Tweeted: " + tweets[i].text);
		 		i++;
		 }
				}
});
}
///// Finished with Twitter portion

/// Spotify portion that takes song info and searches

if (needInfo === "spotify-this-song") 
	{ 
	var songInfo = needInfoTwo;
	var spotify = new Spotify ({
		id: '4c48d465bb7e460ea257530833d1ceae',
		secret: '534b4cc161f94bc6a03f38c214d3302e',
	});

var songName = process.argv.slice(3).join(' ');
	spotify
		.search({type: 'track', query: songName, limit: 1})
		.then(function(response){
	
		for (let i = 0; i < response.tracks.items.length ; i++)
		{
			console.log("Your song is: " + songName +
					" The Artist is: " +  response.tracks.items[i].artists[0].name +
					" The URL preview is: ");
			console.log(response.tracks.items[i].artists[0].external_urls);
			
		}
		
		})
		.catch(function(error) {
		console.log(error);
		});
	}
			
/////  End Spotify Portion

/// Start Movie portion to take movie title and display info
if (needInfo === "movie-this") 
	{		
	var needInfoTwo = inputString[3];
 	console.log(needInfoTwo);
	var movieName = process.argv.slice(3).join(' ');
	console.log(movieName);

		if (inputString[2] === 'undefined')
		{
			var movieName = "Mr. Nobody";
			console.log(movieName);
		}

 // run request
 	request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
   	// If there were no errors and the response code was 200 
   	if (!error && response.statusCode === 200) {
    // Then we print out all movie info
     var movieInfo = JSON.parse(body);
     console.log("Movie Title: " + movieInfo.Title + "\n" + movieInfo.Title + " came out in the year: " + movieInfo.Year + "\nThe IMDB rating is: " + movieInfo.imdbRating + "\nCountry produced: " + movieInfo.Country + "\nLanguage of the movie: " + movieInfo.Language + "\nPlot of the movie: " + movieInfo.Plot + "\nActors in the movie: " + movieInfo.Actors + "\nRT");
   }
 });
}
////  End Movie portion


if (needInfo === "do-what-it-says") 
	{
	var needInfoTwo = inputString[2];
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (!error) {
			console.log("Doing what it says now");
			var doWhatItSays = data.split(",");
			for (var i = 0; i < doWhatItSays.length; i++)
			{
				console.log(doWhatItSays[i]);
				
			}
		}	
	});
	}




