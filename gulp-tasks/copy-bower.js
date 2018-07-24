'use strict';
var gulp = require('gulp');

function copyBower() {
    return gulp.src(['./bower_components/**/*'], {since: gulp.lastRun(copyBower)})
        .pipe(gulp.dest('./build/t2f/bower_components/'));
}



module.exports = copyBower;