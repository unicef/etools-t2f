var express = require('express');
var app = express();
var basedir = '/code/build/t2f/bundled/';
// var basedir = '/Users/nico/Projects/etools/et2f/build/t2f/bundled/';

app.use('/t2f/', express.static(basedir));

app.get(/.*service-worker\.js/, function(req, res) {
  res.sendFile(basedir + 'service-worker.js');
});

app.use(function(req, res) {
  res.sendFile(basedir + 'index.html');
});

// app.listen(8000);
app.listen(8080);
