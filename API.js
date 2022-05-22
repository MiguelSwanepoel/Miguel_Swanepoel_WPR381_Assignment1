const TwitWebApi = require('twit');  // define Twitter API
const SpotifyWebApi = require('spotify-web-api-node');  // define Spotify API
const OMdbWebApi = new (require('omdbapi'))('dfea9817');  // define OMdb Api and create object 
const fs = require('fs');  // define object for file input and output

const T = new TwitWebApi({  // create twitter object
    consumer_key: 'fGe5ZDu0Uhwd0mRVksw96ALOe',
  consumer_secret: 'YZNagbdMV8UmxI3iXOqdnyez7l7JwWYpZ2pbE0xW4AsKamXQ2r',
  access_token: '1525467732719943681-GFJmBiTAjTwnibqbFwlvOCAde8aZkw',
  access_token_secret: 'Oa27LAm62IXBNjF4CHPrUvJSWYMJjb1UTfcc43YjCcrDB'
});

const spotifyApi = new SpotifyWebApi(); // create spotify object

module.exports = {  // export functions as one
    getTweets: function(userName){  // difine function to get tweets
        let params = {query: userName, count: 20} 
        
        T.get('search/tweets', params, (error, data) => {  // get method to search tweets
            if (error) {  // handel error, if there is one...
                console.log('An error occurred while trying to search for tweets: ' + error);  // display error message
            } 
            else {  // return tweets
                return data.body;
            }
        });  
    },

    getSongInfo: function(songName){  // define song info retriever
        spotifyApi.searchTracks(songName)  // call the searchTracks function 
            .then(data => {
                return data.body;  // return info
            }, 
            function(error) {  // handle errors that might be thrown
                console.log('Oops! An error occurred while searching for the song: ' + error);  // display error message
        });
    },

    getMovieInfo: function(movieName){  // define movie info retriever
        OMdbWebApi.get({title: movieName})  // call get method on the omdb object to get the info
            .then(data => {
                return data.body;  // return the info
            }, 
            function(error) {  // handle errors just in case
                console.log('Oops! An error occurred while searching for the movie: ' + error);  // display error message
        });
    },

    fileInfo: function(){  // define function executing query from text file
        let arrData = [];  // create array to store query and search strings

        try {  // handle errors should they appear
            let data = fs.readFileSync('random.text');  // read file data
            let strData = data.toString();  // convert data to string

            arrData = strData.split(',');  // split tring into query and search strings
            
            if (arrData[0] === 'Song name'){  // check if query is for song
                return getSongInfo(arrData[1]);  // return song information
            }
            else if(arrData[0] === 'User name'){  // check user Authenticity
                return this.getTweets(arrData[1]);  // return user tweets
            }
            else{
                return 'Invalid query';  // display error invalid query  
            }

        } catch(error) {
            console.log('Error:', error.message);
        }          
    }
}
