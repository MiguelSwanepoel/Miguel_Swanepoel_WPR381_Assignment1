const readline = require("readline-sync");  // enable getting user input.

const api = require('./APIs');  // import the local module for API calls

let choice;  // define a user choice variable 

while (choice !== '5') {  // Loop display till user exits
    // display the menu options
    console.log();
    console.log('------------------------------------------------------');
    console.log('1: Latest tweets from Username');
    console.log('2: Perform a Spotify song search');
    console.log('3: Find Movie details on OMDB');
    console.log('4: Query from text file')
    console.log('5: I am Done');
    console.log('------------------------------------------------------\n');

    choice = readline.question("Pick a task: \n");  // read user input 
    switch(choice) {  // Navigate users request
        case '1':
            try {  // error handeling just in case
                userName = readline.question("Enter the username: \n");  // ask for the username
                data = api.getTweets(userName);  // get the tweets for the specified username

                let tweetData = JSON.parse(data);  // store the tweet data in an object that can be used to retrieve only the tweets
                console.log('Tweets: ' + tweetData.tweets); // display the tweet data
            } catch (error) {
                console.log('Oops! An unexpected error occurred, see below: \n' + error.message);
            }
        break;

        case '2':
            try {  // error handeling just in case
                song = readline.question("Enquire with song name: \n");  // ask for the song name
                data = api.getSongInfo(song);  // retrieve info for the song

                let songInfo = JSON.parse(data);  // store the song information in an object
                console.log('Artist: ' + songInfo.artist);  // display artist info
                console.log('Album: ' + songInfo.album);  // display album information
                console.log('Song: ' + songInfo.name);  // display song info
                console.log('Preview: ' + songInfo.preview_url);  // display preview link
            } catch (error) { 
                console.log('Oops! An unexpected error occurred, see below: \n' + error.message);
            }
        break;

        case '3':          
            try {
                movie = readline.question("Enter the movie name: \n");
                data = api.getMovieInfo(movie);

                let movieInfo = JSON.parse(data);
                console.log('Movie details: \n' + movieInfo);
            } catch (error) {
                console.log('Oops! An unexpected error occurred, see below: \n' + error.message);
            }
        break;

        case '4':
            try {  // just for incase
                console.log(api.fileInfo());  // display the information returned in text file query
            } catch (error) {
                console.log('Oops! An unexpected error occurred, see below: \n' + error.message);
            }
        break;

        case '5':
            console.log('Glad to be of service.\n');  // saying farewell in a passive agressive manner
        break;

        default:  // handel any invalid input from the user
            console.log('Invalid input given, kindly enter a menu option: 1 - 5\n');  // displays a message for incorrect input
      }
}