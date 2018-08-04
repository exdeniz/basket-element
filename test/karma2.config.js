module.exports = function(config) {
  config.set({
    frameworks: ["mocha", "chai"],
    files: ["../index.js", "test.js"],
    reporters: ["mocha"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ["ChromeHeadless"],
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity
  })
}
