# LIRI-BOT

## About
- Liri is a command line application that takes user commands and queries from the command line and returns data from API's. 
- The following commands have been hard coded into the program to give the user the capability to look up songs, concerts and movie information:


## Before you get started, make sure you have these node packages installed:

- Node-Spotify-API
- Axios
- Moment
- DotEnv You'll need keys for these APIs
- BandsinTown API
- Spotify API
- OMDB API


## Running the tests
### Possible commands are:

#### concert-this 
- This command used the Bands in Town Artist Events API. An axios.get sent the search request and the results were console.logged using moment to change the format of the returned date.
#### spotify-this-song 
- This command used the Spotify request API. A node-spotify-api spotify.request sent the search request and the results were console.logged.
#### movie-this 
- This command used the omdb API. An axios.get sent the search request and the results were console.logged.
#### do-what-it-says
- This command pulled the spotify-this-song information from the local random.txt file.
