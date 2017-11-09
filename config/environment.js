/* jshint node: true */

var contentSecurityPolicy = {
  'connect-src': "'self' https://*.google.com"
};

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'mi-guatemala',
    environment: environment,
    rootURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      spreadsheetUrl: '/spreadsheet-url',
      staticFilesUrl: null
      // staticFilesUrl: 'http://192.168.43.112:6360/static-files/'
      // staticFilesUrl: 'http://eleccionpdh.org/static-files/'
    },

    disqus: {
      shortname: 'eleccion-cang'
    },

    contentSecurityPolicy: contentSecurityPolicy
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentSecurityPolicy = contentSecurityPolicy;
    ENV.contentSecurityPolicy['script-src'] = "'self' 'unsafe-eval' 192.168.250.206:* 172.20.10.9:*";
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.googleAnalytics = {
      webPropertyId: 'UA-101167670-1'
    };
  }

  return ENV;
};
