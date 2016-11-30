var express = require('express');
var app = express();
// var basedir = '/code/build/et2f/bundled/';
var basedir = 'build/et2f/bundled/';


app.use('/t2f/', express.static(basedir));

app.listen(8080);