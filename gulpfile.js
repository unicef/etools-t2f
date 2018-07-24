/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

'use strict';

const path = require('path');
const gulp = require('gulp');
const clean = require('./gulp-tasks/clean.js');

const buildElements = require('./gulp-tasks/build-elements');
const copyBower = require('./gulp-tasks/copy-bower');

// !!! IMPORTANT !!! //
// Keep the global.config above any of the gulp-tasks that depend on it
global.config = {
  // Name of your app
  appName: 't2f',
  polymerJsonPath: path.join(process.cwd(), 'polymer.json'),
  build: {
    rootDirectory: 'build/t2f',
    bundledDirectory: 'bundled',
    unbundledDirectory: 'unbundled',
    // Accepts either 'bundled', 'unbundled', or 'both'
    // A bundled version will be vulcanized and sharded. An unbundled version
    // will not have its files combined (this is for projects using HTTP/2
    // server push). Using the 'both' option will create two output projects,
    // one for bundled and one for unbundled
    bundleType: 'bundled' // We will only be using a bundled build
  },
  // Path to your service worker, relative to the build root directory
  serviceWorkerPath: 'service-worker.js',
  // Service Worker precache options based on
  // https://github.com/GoogleChrome/sw-precache#options-parameter
  swPrecacheConfig: {
    replacePrefix: '/t2f/',
    navigateFallback: '/index.html'
  },
  sourceCodeDirectory: './t2f'
};

const project = require('./gulp-tasks/project.js');
const source = require('./gulp-tasks/project-source');
const dependencies = require('./gulp-tasks/project-dependencies');


//Lint, transpile, minify scripts
gulp.task('default', gulp.series(clean.build, copyBower, buildElements, project.merge(source, dependencies), clean.bowerInSrc));

