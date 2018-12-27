'use strict';

var path = require('path');
var conf = require('./gulp/conf');

var _ = require('lodash');
var wiredep = require('wiredep');

function listFiles() {
  var wiredepOptions = _.extend({}, conf.wiredep, {
    dependencies: true,
    devDependencies: true
  });

  return wiredep(wiredepOptions).js
      .concat([
        path.join(conf.paths.src, '/app/**/*.module.js'),
        path.join(conf.paths.src, '/app/**/*.js'),
        path.join(conf.paths.src, '/app/**/*.json'),
        path.join(conf.paths.src, '/**/*.spec.js'),
        path.join(conf.paths.src, '/**/*.mock.js'),
        path.join(conf.paths.src, '/**/*.html')
      ]);
}

module.exports = function (config) {

  var configuration = {
    files: listFiles(),

    singleRun: true,

    autoWatch: false,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    reporters : ['progress', 'junit'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test-results.xml'
    }
  };

  config.set(configuration);
};
