'use strict';

const babel = require("gulp-babel");
const compileHtmlTags = require('gulp-compile-html-tags');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const cssSlam = require('css-slam').gulp;
const project = require('./project.js');
const combine = require('stream-combiner2').obj;
const linter = require('./js-linter');

function minifyJs() {
    return uglify({
        preserveComments: false
    });
}

function minifyCss() {
    return cssSlam();
}

function minifyHtml() {
    return htmlmin({
        // options
        caseSensitive: true,
        collapseWhitespace: true
    });
}

module.exports = function() {
    return project.splitSource()
        .pipe(linter)
        .pipe(gulpif('**/*.js', babel()))
        .pipe(gulpif(function(file) {
            return file.extname === '.html' && file.stem !== 'index';
        }, combine(
            compileHtmlTags('style', function (tag, data) { return data.pipe(minifyCss()) }),
            compileHtmlTags('script', function (tag, data) { return data.pipe(babel()).pipe(minifyJs()); }),
            minifyHtml()
        )))
        .pipe(project.rejoin()); // Call rejoin when you're finished
};