const http = require('http'),
  express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  MongoClient = require('mongodb').MongoClient,
  Server = require('mongodb').Server,
  CollectionDriver = require('./collectionDriver').CollectionDriver;
  pug = require('pug'); //https://pugjs.org/api/reference.html

//https://expressjs.com/en/4x/api.html#app.settings.table
//https://expressjs.com/en/4x/api.html#app.use
//https://expressjs.com/en/api.html#res
var app = express();

app.use(bodyParser.json()); //for req.body -> json

//compile pug
const compiledFunction = pug.compile('404.pug');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//set up mongodb
var mongoHost = 'localHost'; //change if hosted elsewhere
var mongoPort = 27017;
var url = 'mongodb://' + mongoHost + ':' + mongoPort + '/MyDatabase';
var collectionDriver;

var mongoClient = new MongoClient(new Server(mongoHost, mongoPort));
mongoClient.connect(url, function(err, db) {
  if (err) {
      console.error("Error! Exiting... Must start MongoDB first");
      process.exit(1);
  }
  collectionDriver = new CollectionDriver(db);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/:collection', function(req, res) {
  var params = req.params;
  console.log('req.params: ' + params);
  collectionDriver.findAll(req.params.collection, function(error, objs) {
    if (error) { res.send(400, error); }
    else {
      if (req.accepts('html')) {
        if (objs == '') {
          res.status(200).send('No objects retrieved from URL');
        } else {
          // res.render('data',{objects: objs, collection: req.params.collection});
          res.status(200).send(objs);
        }
      } else {
        res.set('Content-Type','application/json');
        res.send(200, objs);
      }
    }
  });
});

app.get('/:collection/:entity', function(req, res) {
  var params = req.params;
  var entity = params.entity;
  var collection = params.collection;
  if (entity) {
    collectionDriver.get(collection, entity, function(error, objs) {
      if (error) { res.status(400).send(error); }
      else { res.send(200, objs); }
    });
  } else {
    res.send(400, {error: 'bad url', url: req.url});
  }
});

app.post('/:collection', function(req, res) {
  console.log('app.post called');
  console.log(req.body);
  var object = req.body;
  var collection = req.params.collection;
  collectionDriver.save(collection, object, function(err,docs) {
    if (err) { res.send(400, err); }
    else { res.status(201).send(docs); }
  });
});

app.use(function (req,res) {
  res.render('404', {url:req.url});
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'))
});
