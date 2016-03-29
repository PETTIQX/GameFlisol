
/**
 * Module dependencies.
 */

var express = require('express')
var logger = require('morgan')
var router = require('./routes')
var bodyParser = require('body-parser')

var app = express();

// Configuration
app.use(bodyParser.json())

//TODO configurar arquivos estáticos para a versão web
//  app.use(express.static(__dirname + '/public'))

app.use('/', router)

if('development' == app.get('env')){
  //development only
  var errorHandler = require('errorhandler');
  app.use(errorHandler({ dumpExceptions: true, showStack: true }))
  app.use(logger('dev'))
}

if('production' ==  app.get('env')){
  //app.use()
  app.use(logger('common'))
  //todo usar middleware para tratar erros
}

var server = app.listen(6008, function(){
  console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
});

module.exports = app;