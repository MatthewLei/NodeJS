# Learning NodeJS and MongoDB with Express

simple project to learn the MEAN stack (MongoDB, Express, AngularJS, NodeJS)


## Using the following dependencies:
1. "express": "*",
2. "pug": "2.0.0-beta11",
3. "mongodb": "2.2.19",
4. "body-parser": "*"

## What I learned from this project (technical detials or otherwise).

These are personal notes, and may be wrong from those who are wiser

* Writing NodeJS index.js file summary:
  1. express = require('express'),
  2. MongoClient = require('mongodb').MongoClient,
  3. Server = require('mongodb').Server,
  4. var app = express();
  5. app.set to set up host, ports, and other stuff (e.g. body-parser)
  6. app.get(path, callback) to capture functionality for various URL paths
    * https://expressjs.com/en/4x/api.html#app.get
  7. implement the other HTTP methods (put, delete, post, update, etc.)
    * app.put(path, callback), app.delete(..), app.update(..), etc.
    * https://expressjs.com/en/4x/api.html#routing-methods
  8. http.createServer(app).listen(port, callback) to finally listen
* Express notes
  * Express adds middleware functionality to NodeJS
* MongoDB notes (https://docs.mongodb.com/manual/reference/):
  * default port is 27017
* Should probably use some view engine generator
  * I used Pug https://pugjs.org/api/getting-started.html

## Current/Future learning objectives:
* Where and how does AngularJS come into play?
* Learn more about CollectionDriver.
 
## Other Note:
* npm update - I did not push latest node_modules (Maybe I should?)
* install mongodb and run it with the mongod command in the terminal
* install node and run with node <file.js>
  * node . (node followed by period)
    * searches current directory for index.js to run

## Special Thanks Michael Katz for the great tutorial
https://www.raywenderlich.com/61078/write-simple-node-jsmongodb-web-service-ios-app