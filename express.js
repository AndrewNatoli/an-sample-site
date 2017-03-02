/**
 * Super duper simple server.
 * Run with 'node express.js'
 */
var express = require('express');
var app = express();

var _PORT = 8080;

app.use(express.static('dist'));

app.listen(_PORT, function () {
  console.log('Listening on :' + _PORT)
});