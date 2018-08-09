'use strict';

const gulp = require('gulp'),
    compileHtmlTags = require('gulp-compile-html-tags'),
    babel = require("gulp-babel"),
    gulpIf = require('gulp-if'),
    combine = require('stream-combiner2').obj,
    through2 = require('through2').obj,
    path = require('path');

function buildElements(done) {
  gulp
    .src(["./t2f/**/*.html"])
    // compile html/js/scss
    .pipe(
      gulpIf(
        function(file) {
          return !~file.basename.indexOf(".spec.html");
        },
        combine(
          compileHtmlTags("script", function(tag, data) {
            return data.pipe(
              babel().on("error", function(error) {
                console.log("\x1b[31m%s\x1b[0m", error.message);
                done();
              })
            );
          }),
          through2(function(file, enc, callback) {
            file.base = path.normalize(file.base + "/..");
            callback(null, file);
          })
        )
      )
    )
    .pipe(gulp.dest("./build/t2f/"))
    .on("end", function() {
      done();
    });
}

module.exports = buildElements;