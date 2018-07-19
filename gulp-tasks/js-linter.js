'use strict';
const jshint = require('gulp-jshint');
const jscs = require('gulp-jscs');
const gulpIf = require('gulp-if');
const combine = require('stream-combiner2').obj;
const argv = require('yargs').argv;

const linter = gulpIf(
    ["**/*.js", "!**/*.min.js"],
    combine(
      jshint(),
      jscs(),
      jshint.reporter("default"),
      jscs.reporter(),
      gulpIf(argv.pc, jshint.reporter("fail")),
      gulpIf(argv.pc, jscs.reporter("fail"))
    )
  );

module.exports = linter;
