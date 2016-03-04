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

server.get('/:lat1/:long1/:lat2/:long2', function (req, res, next) {
var result = distance(req.params["lat1"], req.params["long1"], req.params["lat2"], req.params["long2"]);
res.send({
  lat1: req.params["lat1"],
  long1: req.params["long1"],
  lat2: req.params["lat2"],
  long2: req.params["long2"],
  distance: result
});

return next();
});



server.listen(process.env.SERVER_PORT, function () {
  console.log('%s listening at %s', server.name, server.url);
});
