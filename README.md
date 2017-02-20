# Learning NodeJS and MongoDB with Express

simple project to learn the MEAN stack (MongoDB, Express, AngularJS, NodeJS)


## Using the following dependencies:
1. "express": "*",
2. "pug": "2.0.0-beta11",
3. "mongodb": "2.2.19",
4. "body-parser": "*",
5. "phone": "*"


## How to (MacOS)
1. Clone repo and run npm update to get dependency packages.
2. Open terminal and run mongod (install mongodb first)
3. Open second terminal tab and go to project folder with index.js file
4. Run 'node .' (without single quote) or 'node index.js'
5. Open third terminal tab and run:
  * <pre><code>curl -H "Content-Type: application/json" -X POST -w "\nHTTP status code: %{http_code}\\n" -d '{"name":"NameHere","phone":"PhoneNumHere","email":"EmailHere"}' http://localhost:3000/customers</pre></code>
    * -X specifies what HTTP method to use (POST in this case)
    * -w is for print-out after completed and successful operation.
      * refer to man pages
      * we are printing out the HTTP status code.
    * -d is for sending data (a JSON object in our case)
    * fill in name, phone, and email if you like
6. You should see a new object created and sent back as a response or an error response with HTTP status code.
7. Now, send the following GET request:
  * <code>curl http://localhost:3000/customers | python -mjson.tool</code>
    * piping into python tool is for pretty printing JSON objects
8. You should see the object you just created.
9. If you do another POST with curl without all three properties (name, phone, email), you should see an error message (with HTTP status code)
10. That's it! That's the scope of this project. Done.

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
  * in Express, the "res" parameter that you define in Express app callbacks (e.g. app.get(path, callback(req,res)) is an enhanced version of Node's own response object and supports all built-in fields and methods (https://expressjs.com/en/api.html#res)
  * in Express, the "req" parameter is an enhanced version of Node's request object and supports all built-in fields and methods (https://expressjs.com/en/api.html#req)
  * Express in the future will NOT have Jade (which was rebranded/renamed to Pug) as its default template engine (https://github.com/expressjs/generator/issues/141).
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
