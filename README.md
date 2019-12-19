### QUAKE-LOG-PARSER
An API to parse Quake logs and query for games rankings.
_(by Fabrício Lombardi Ribeiro)_

# Requirements
- NodeJS v12.13.1

# Installation
First clone the project:
`git clone https://github.com/flribeiro/quake-log-parser.git`

And then, after entering the directory of the project, type:

`npm install`

To install all dependencies packages and modules.

After that, you can start the app typing:

`npm run start`

The API would be accessible on the following URL:

`http://localhost:8080/`


# Running the tests
To execute the test suite for the app, type 
`npm run test`

Unfortunately, the server is generating an error when inializing for tests, and I couldn't treat this error in time.

# Another Requirements
The log file should be in the directory `src/logfile/` of the project's directory tree, and should be named `games.log` in order to the server found it and parse it.

# Routes and endpoints

- *GET /games*
Description: returns an array with all the games found in the log parsed.

Response payload: 
```
	[
	    {
	        "gameId": 1,
	        "total_kills": 0,
	        "players": [],
	        "kills": {}
	    },
	    {
	        "gameId": 2,
	        "total_kills": 11,
	        "players": [
	            "Isgalamido",
	            "Dono da Bola",
	            "Mocinha"
	        ],
	        "kills": {
	            "Isgalamido": 7,
	            "Dono da Bola": -7,
	            "Mocinha": null
	        }
	    },
	    {...}
	]
```

---

- *GET /games/{id}*
Description: returns a game object.

```
    {
        "gameId": 2,
        "total_kills": 11,
        "players": [
            "Isgalamido",
            "Dono da Bola",
            "Mocinha"
        ],
        "kills": {
            "Isgalamido": 7,
            "Dono da Bola": -7,
            "Mocinha": null
        }
    }
```

# Observations
- API developed without a preset template. Structuring was made in development time;
- I'm conscious about the lacking of any kind of authentication. Having more time I could take care of that;
- The tests suite isn't covering all the layers of the app, and isn't covering the models methods. Also, they aren't working properly because, as I've said before, I couldn't make sufficient time to treat the initializing issue with the server. But I keep them on the code, just for the sake of show my knowledgment on tests management;
- The project counts on Swagger, a vastly used tool for API developments. It is available (when server is started) on the following URL:
	`http://localhost:8080/documentation`


# Another modules and packages used
- *Hapi* - NodeJS framework used in Luizalabs
- *Swagger* - Framework for building and documenting APIs
- *Joi* - Tool for input/output validation for RESTful APIs
- *Babel* - Javascript transpiler for NodeJS (for ES6-like code)
- *Lab* - A NodeJS utility for testing
- *Code* - A library for assertions when testing code
