var express = require('express');
var path = require('path');
var http = require('http');
var config = require('./config');
var routes = require('./routes');
var app = express();

app.configure('development', function() {
  app.use(express.logger({format: ':method :url :status'}));
  app.use(express.static(path.join(__dirname, '.')));
  app.use(express.cookieParser());
  app.use(express.session({secret: config.session_secret}));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
  app.locals({config: config});
});

routes(app);
app.listen(config.port);
console.log(config.host + ':' + config.port);
