const http = require('http'),
  util = require('util'),
  express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  MongoClient = require('mongodb').MongoClient,
  Server = require('mongodb').Server,
  CollectionDriver = require('./collectionDriver').CollectionDriver;
  pug = require('pug'), //https://pugjs.org/api/reference.html
  phone = require('phone'), //https://www.npmjs.com/package/phone
  emailValidator = require('email-validator'), //https://www.npmjs.com/package/email-validator
  xmlParser = require('js2xmlparser'); //https://www.npmjs.com/package/js2xmlparser

//https://expressjs.com/en/4x/api.html#app.settings.table
//https://expressjs.com/en/4x/api.html#app.use
//https://expressjs.com/en/api.html#res
//https://expressjs.com/en/api.html#req
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
    if (error) {
      res.status(400).send(error);
    } else if (objs == '') {
      res.status(204).send('No objects obtained');
    } else {
      console.log('req.get("Accept"): ' + req.get('Accept'));
      if (req.accepts('*/*') || req.accepts('application/json')) {
        res.set('Content-Type','application/json');
        res.status(200).send(objs);
        // res.render('data',{objects: objs, collection: req.params.collection});
      } else if (req.accepts('application/xml')) {
        objs.forEach(function(item) {
          //wonky _id invalid char bug
          item._id = item._id.toString();
        });
        res.set('Content-Type', 'application/xml');
        var xmlObjs = xmlParser.parse('Documents', objs);
        res.status(200).send(xmlObjs + '\n');
      } else {
        res.status(406).send('Not acceptable Accept type');
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

var validateName = function(object, callback) {
  if (!object.hasOwnProperty('name')) {
    callback('missing name\n');
  } else {
    if (object.name.length < 2) {
      callback('Name must contain at least 2 letters\n');
    }
  }
}

var validatePhone = function(object, callback) {
  if (!object.hasOwnProperty('phone')) {
    callback('missing phone\n');
  } else {
    if (phone(object.phone).length == 0){
      callback('Invalid phone number\n');
    }
  }
}

var validateEmail = function(object, callback) {
  if (!object.hasOwnProperty('email')) {
    callback('missing email\n');
  } else {
    if (!emailValidator.validate(object.email)) {
      callback('Invalid email\n');
    }
  }
}

app.post('/:collection', function(req, res) {
  console.log('app.post called');
  console.log(req.body);
  var object = req.body;
  var collection = req.params.collection;
  var errStr = '';

  validateName(object, function(nameErr) {
    if (nameErr) {
      console.log('name error');
      errStr += nameErr;
    }
  });
  validatePhone(object, function(phoneErr) {
    if (phoneErr) {
      console.log('phone error');
      errStr += phoneErr;
    }
  });
  validateEmail(object, function(emailErr) {
    if (emailErr) {
      console.log('email error');
      errStr += emailErr;
    }
  });

  if (errStr != '') {
    res.status(400).send(errStr);
  } else {
    collectionDriver.save(collection, object, function(err,docs) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send(docs);
      }
    });
  }
});

app.use(function (req,res) {
  res.render('404', {url:req.url});
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'))
});
