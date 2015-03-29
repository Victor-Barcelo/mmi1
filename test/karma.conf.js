// Karma configuration
// Generated on Mon Jul 21 2014 11:48:34 GMT+0200 (CEST)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'sinon-chai'],


        // list of files / patterns to load in the browser
        files: [
            'lib/lodash.min.js',
            '../node_modules/jquery/dist/jquery.js',
            '../node_modules/angular/angular.js',
            '../node_modules/angular-ui-router/release/angular-ui-router.js',
            '../node_modules/angular-messages/angular-messages.js',
            '../node_modules/angular-mocks/angular-mocks.js',
            '../src/js/**/*.js',
            'unit/*.test.js'
        ],

        // list of files to exclude
        exclude: [
            '../src/js/charts/charts.js',
            '../src/js/vendor/*'
        ],

        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};