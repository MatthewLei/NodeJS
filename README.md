# Learning NodeJS and MongoDB with Express

simple project to learn the MEAN stack (MongoDB, Express, AngularJS, NodeJS)


## Using the following dependencies:
1. "express": "*",
2. "pug": "2.0.0-beta11",
3. "mongodb": "2.2.19",
4. "body-parser": "*",
5. "phone": "*",
6. "email-validator": "*",
7. "js2xmlparser": "*"


## How to (MacOS)
1. Clone repo and run npm update to get dependency packages.
2. Open terminal and run mongod (install mongodb first)
3. Open second terminal tab and go to project folder with index.js file
4. Run 'node .' (without single quote) or 'node index.js'
5. Open third terminal tab and run:
  * <pre><code>curl -H "Content-Type: application/json" -X POST -w "\nHTTP status code: %{http_code}\\n" -d '{"name":"NameHere","phone":"503 555 5555","email":"email@email.com"}' http://localhost:3000/customers</pre></code>
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
  * You can add `-H "Accept: application/xml"` to get response as xml
8. You should see the object you just created.
9. If you do another POST with curl without all three properties (name, phone, email), you should see an error message (with HTTP status code)
10. That's it! That's the scope of this project. Done.

## What I learned from this project (technical detials or otherwise).
These are personal notes, and may be wrong from those who are wiser

* HTTP protocols and related:
  * The Accept header of a clients request is the type of content that they will accept, whereas the Content-Type header indicates the type of content that is part of the current request or response.
    * for example, a client can send a POST with the Accept header of text/html and a Content-Type of application/json because it is sending a json object. The server will process the request and send back a response of Content-Type text/html because that is the type that the client accepts.
    * The type is written as `type/subtype` where `*/*` accepts all types (which is default if no accept type is listed.
      * for example, `application/json` is accepting json, which is a subtype of application.
    * a server that cannot process the requested accept type of a request should send back a `406` (not acceptable) response.
    * common types include: application/json, application/pdf, application/xml, audio/mpeg, text/html, image/png, and more (https://en.wikipedia.org/wiki/Media_type#Common_examples).
    * In Express, use `req.get('Accept')` to get Accept header.
* Writing NodeJS index.js file summary:
  1. Initial thought of Express with NodeJS is just a bunch of app calls (use, set, get, put, etc.). Seems rather straightforward.
  2. express = require('express); var app = express();
  3. app.set to set up host, ports, and other stuff (e.g. body-parser)
  4. app.get(path, callback) to capture functionality for various URL paths
    * https://expressjs.com/en/4x/api.html#app.get
  5. implement the other HTTP methods (put, delete, post, update, etc.)
    * app.put(path, callback), app.delete(..), app.update(..), etc.
    * https://expressjs.com/en/4x/api.html#routing-methods
  6. http.createServer(app).listen(port, callback) to finally listen
* Express notes
  * Express adds middleware functionality to NodeJS
  * in Express, the "res" parameter that you define in Express app callbacks (e.g. app.get(path, callback(req,res)) is an enhanced version of Node's own response object and supports all built-in fields and methods (https://expressjs.com/en/api.html#res)
  * in Express, the "req" parameter is an enhanced version of Node's request object and supports all built-in fields and methods (https://expressjs.com/en/api.html#req)
  * Express in the future will NOT have Jade (which was rebranded/renamed to Pug) as its default template engine (https://github.com/expressjs/generator/issues/141).
* MongoDB notes (https://docs.mongodb.com/manual/reference/):
  * default port is 27017
  * with mongod running, type `mongo` in another terminal to open mongo shell:
    * `show dbs` to show databases
    * `use <db_name>` to use that database. Will be binded to `db`
    * after `use`, `db.getCollectionNames()` to list all collections
    * `db.<collection_name>.drop()` will delete the specified collection
    * `db.<collection_name>.find()` will list the first 20 documents
    * `db.<collection_name>.delete({"_id": ObjectId("<id_here>")})` to delete by id
* Should probably use some view engine generator
  * I used Pug https://pugjs.org/api/getting-started.html

## Current/Future learning objectives:
* Where and how does AngularJS come into play?
* Learn more about Mongodb's Collection class
* Do not accept duplicate email submissions
* implement date of birth (and validate it)
* on POST error, return a more valid (json?) response than "missing ..."
* use TDD to run and run test against our API
 
## Other Note:
* npm update - I did not push latest node_modules (Maybe I should?)
* install mongodb and run it with the mongod command in the terminal
* install node and run with node <file.js>
  * node . (node followed by period)
    * searches current directory for index.js to run

## Special Thanks Michael Katz for the great tutorial
https://www.raywenderlich.com/61078/write-simple-node-jsmongodb-web-service-ios-app
