'use strict';

const gulp = require('gulp'),
    compileHtmlTags = require('gulp-compile-html-tags'),
    sass = require('gulp-sass'),
    babel = require("gulp-babel"),
    gulpIf = require('gulp-if'),
    fs = require('fs'),
    combine = require('stream-combiner2').obj,
    through2 = require('through2').obj,
    path = require('path'),
    replace = require('gulp-replace');



function buildElements(done) {
    gulp.src(['./**/*.html'])
        // compile html/js/scss
        .pipe(gulpIf(
            function(file) {
                return !~file.basename.indexOf('.spec.html');
            },
            combine(
                compileHtmlTags('style', function (tag, data) {
                    return data.pipe(sass().on('error', function(error) {console.log('\x1b[31m%s\x1b[0m', error.message); done()}))
                }),
                compileHtmlTags('script', function (tag, data) {
                    return data.pipe(babel({
                        presets: ['es2015', 'es2017']
                    }).on('error', function(error) {console.log('\x1b[31m%s\x1b[0m', error.message); done()}));
                }),
                through2(function(file, enc, callback){
                    file.base = path.normalize(file.base + '/..');
                    callback(null, file);
                })
            )
        ))
        .pipe(gulp.dest('./build/'))
        .on('end', function () {
            let testsPerFile = 24;
            let indexFilesLength = Math.ceil(testSources.length / testsPerFile) || 1;

            console.log(`\x1b[32mFound ${testSources.length} test files. They will be combined into ${indexFilesLength} file(s).\x1b[0m`);

            for (let i = 0; i < indexFilesLength; i++) {
                fs.writeFileSync(`./build/tests/index${i + 1}.spec.html`, fs.readFileSync('./src/tests/index.spec.html'));
            }

            // add test sources to index{1,2...}.spec.html
            gulp.src('./build/tests/index*.spec.html')
                .pipe(replace('<!--testSources-->', function(match) {
                    return `"${testSources.splice(0, testsPerFile).join('", "')}"`;
                }))
                .pipe(gulp.dest('./build/tests/'));

            done();
        });
}

module.exports = buildElements;