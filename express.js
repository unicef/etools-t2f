var express = require('express');
var app = express();
var basedir = '/code/build/t2f/bundled/';
//var basedir = '/Users/Robi/Desktop/etools/infra/etools-infra/pmp/build/pmp/bundled/';


app.use('/t2f/', express.static(basedir));

app.get(/.*service-worker\.js/, function(req, res) {
  res.sendFile(basedir + 'service-worker.js');
});

app.use(function(req, res) {
  res.sendFile(basedir + 'index.html');
});



app.listen(8080);
