// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'), // eslint-disable-line
      require('karma-chrome-launcher'), // eslint-disable-line
      require('karma-jasmine-html-reporter'), // eslint-disable-line
      require('karma-coverage-istanbul-reporter'), // eslint-disable-line
      require('@angular-devkit/build-angular/plugins/karma'), // eslint-disable-line
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/usa-components'), // eslint-disable-line
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    singleRun: true,
  })
}
