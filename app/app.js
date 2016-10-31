console.log("Configuring the application...");
var environment = process.env.NODE_ENV || 'local';

var appLoader = require('../utils/app_loader');
var express = require('express');

var app = express();
app.environment = environment;

appLoader.loadApp(app, 'controllers');
appLoader.loadApp(app, 'middlewares');
//appLoader.loadErrorHandler(app);

var port = process.env.PORT || 8080;
app.listen(port);
console.log("Listening on port " + port);
