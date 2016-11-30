var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();
// var basedir = '/code/build/et2f/bundled/';
var basedir = 'build/t2f/bundled/';
var basePort = 8080;
var serverPort = ':8000';

var backendProxy = proxy('/api/', {
  target: 'http://127.0.0.1:8000/', //change with own IP
  changeOrigin: true,             // for vhosted sites, changes host header to match to target's host
  logLevel: 'debug'
});

app.use('/t2f/', express.static(basedir));

app.use('/api/', backendProxy);
app.listen(basePort);