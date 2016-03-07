require('dotenv').config();

var restify = require('restify');
var distance = require('./Distance.js');
var server = restify.createServer({
  name: process.env.SERVER_NAME,
  version: process.env.SERVER_VERSION,
  url: process.env.SERVER_URL
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/', function (req, res, next) {
  res.send('Index Page, go to /lat1/long1/lat2/long2 for the api.');
});

server.get('/:lat1/:long1/:lat2/:long2', function (req, res, next) {
  var result = distance(req.params["lat1"], req.params["long1"], req.params["lat2"], req.params["long2"]);
  res.send({
    lat1: Number(req.params["lat1"]*1000)/1000,
    long1: Number(req.params["long1"]),
    lat2: Number(req.params["lat2"]),
    long2: Number(req.params["long2"]),
    distance: result
  });
  return next();
});



server.listen(process.env.SERVER_PORT, function () {
  console.log('%s listening at %s', server.name, server.url);
});
