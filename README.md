Game is deployed at: http://game-of-war.herokuapp.com/

## Introduction
* Game is rendered and result is displayed in the console. 
* After forking, cloning, and installing all node dependencies
	1. Create a database named **War** with the command `createdb War` or with psql commands `CREATE DATABASE WAR` or with `npm run createdb`
	2. Run `npm run start:server` to start the server and webpack. 
	3. The app runs at localhost:8080



### Notes
* If I had more time, I would definitely implement a more thorough UI. I prioritized rendering the game's logic and making sure it worked without fail and connected to the API and database successfully. 
* In addition, I would have parsed the game logic out into more functions to keep the code DRY.  
* I would have also liked to create more features that interact with the other endpoints I made including displaying player lifetime wins, which are stored in the database. I chose to run a relational database so that the API could support features like this. But otherwise, a nonrelational database could have worked too. 
* Lastly, I ran verification logic for the API calls on the client side. For example, when the user enters a name that doesn't exist in the database, the app will automatically create a new instance of Player. Although node does run faster, I believe the difference in time was minimal enough to allow that logic to be handled on the client side. 

Thank you! 