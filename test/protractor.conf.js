exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['e2e/*.test.js'],
    multiCapabilities: [
        {
            'browserName': 'chrome'
        },
        {
            'browserName': 'firefox'
        },
        {
            'browserName': 'phantomjs',
            'phantomjs.binary.path': '/usr/local/bin/phantomjs'
        }
    ]
};