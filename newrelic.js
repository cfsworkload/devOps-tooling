/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */

 var pkg = require("./package.json")
 var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
 var APP_NAME     = pkg.name || "unnamed-app"
 

 var NewRelicLicenseKey = vcapServices.newrelic[0].credentials.licenseKey;

//------------------------------------------------------------------------------
exports.config = {
  /**
   * Array of application names.
   */
  app_name : [APP_NAME],

  /**
   * Your New Relic license key.
   */
  license_key : NewRelicLicenseKey || "no-license-key-provided",

  logging : {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level : "info"
  }
}

//------------------------------------------------------------------------------
exports.initialize = function() {

  if (!NewRelicLicenseKey) {
    console.log("newrelic not in use; env var " + ENV_VAR_NAME + " not set")
    return
  }

  console.log("newrelic in use; app name: " + APP_NAME)
  require("newrelic")
}