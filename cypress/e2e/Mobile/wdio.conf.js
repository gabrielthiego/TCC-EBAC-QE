const baseConfig = require('./wdio.conf.js');

exports.config = {
  ...baseConfig,

 specs: [
  './test/specs/**/*.js'
],
  capabilities: [{
    platformName: 'Android',
    'appium:platformVersion': '13',
    'appium:deviceName': 'emulator-5554',
    'appium:automationName': 'UiAutomator2',
    'appium:app': 'C:/Users/gabri/Downloads/output_apks/universal.apk',
    'appium:appWaitActivity': 'com.woocommerce.android.ui.login.LoginActivity',
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 240,
  }],

  services: ['appium'],

  framework: 'mocha',

  reporters: ['spec'],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
};