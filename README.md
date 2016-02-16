# Workload - DevOps Tooling

### DevOps continuous integration applied to Blue Messenger

The Bluemix pipeline has been created and applied to the Architecture Center's [Blue Messenger](https://github.com/cfsworkload/blue-messenger/overview) app.

## Introduction

This pipeline demonstrates continuous integration using Bluemix DevOps features. When changes are pushed in Git to the master branch of your project, linting, unit testing, deployment to a test environment, performance testing, and behavioral testing are initiated and validated before a zero-downtime deployment to production.
Logging happens throughout the pipeline's cycle through an integration with Slack. The services **NewRelic**, **Google Analytics**, and **Monitoring and Analytics** are also used to give real-time data on the status of the web application. **Auto-scaling** is used to handle scalability.

## Create accounts and log in

Sign up for Bluemix at https://console.ng.bluemix.net and DevOps Services at https://hub.jazz.net.
When you sign up, you'll create IBM ID, create an alias, and register with Bluemix.


## Deploy to Bluemix

When you deploy the pipeline to Bluemix, you'll also sign up for **Slack**, a collaborative messaging tool, and **Sauce Labs**, which provides automated testing.

1. Select the **Deploy to Bluemix** button below. In the deployment screen that comes up, you will see the integration sections for **Slack** and **Sauce Labs**.

  [![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/cfsworkload/devOps-tooling.git)
2. Select **Create an account** on both to retrieve the necessary information for the fields requested.
3. Create a channel in Slack to view continuous status messages of your pipeline.
4. See https://api.slack.com/web#authentication to get a Slack API key.
5. Once you fill in the necessary fields, click **DEPLOY**. This will start the deployment of **Blue Messenger** and the static services used with the application.

## Monitor deployment

After the pipeline has been configured, you can monitor the deployment in DevOps Services.

1. In DevOps Services, select **MY PROJECTS**.
2. Click **BUILD & DEPLOY**.
3. Select **View logs and history** to monitor the deployment stages.

Once the deployment finishes, you will have an instance of the **Blue Messenger** app in your Bluemix Dashboard. Now you'll set up the pipeline for continuous integration.

## Set up Slack integration

In the Build stage of the pipeline, add the Slack incoming webhook URL to give more detailed information on the changes committed in Git. You need to retrieve the webhook and add it in the stage settings as an environment variable.


1. Navigate to https://my.slack.com/services/new/incoming-webhook to add a new webhook.
2. Enter the channel name you specified during the Deploy to Bluemix process and click **Add Incoming WebHooks Integration**.
3. Copy the **Webhook URL**.
4. Return to your project in DevOps Services and click **BUILD AND DEPLOY**. This will take you to your project's pipeline.
5. In the first tile, **Build Stage**, click the gear icon to access configuration settings.
6. Select the **ENVIRONMENT PROPERTIES** tab.
7. In the **Value** field of the **SLACK_WEBHOOK_PATH**, enter your webhook URL.
8. Click **SAVE**.

## Set up BlazeMeter integration

The pipeline uses BlazeMeter for performance testing. After signing up for a free trial with BlazeMeter, you'll get the API token and add it to your pipeline.

 1. Navigate to https://www.blazemeter.com and select **START TESTING NOW**.
 2. Click the profile icon at the top right and select **API Key**.
 3. Copy the contents in the **Your Current Key** field.
 4. Return to your project's pipeline in DevOps Services.
 5. In the **Performance test with BlazeMeter** tile, click the gear icon to access configuration settings.
 6. Select the **ENVIRONMENT PROPERTIES** tab.
 7. In the **token** field, enter your BlazeMeter API key.
 8. Click **SAVE**.

Your pipeline is now set up to use Taurus with BlazeMeter to do performance testing.

## Set up Google Analytics

Google Analytics has been integrated into this version of the Blue Messenger app. To link your own Google Analytics to the app, follow the steps below.

1. Get a **Tracking ID** from https://www.google.com/analytics/web.
2. Select **ADMIN** at the top to manage your accounts, properties, and tracking info. Once you get a tracking ID, put it into the application's source code.
3. Return to your project in DevOps Services and click **EDIT CODE** at top right of the page.
4. Select the **public/index.html** file.
5. In the `script` block with the `GoogleAnalyticsObject`, enter your tracking ID where it says `replace me` in the first `ga() field`.

Before you commit and push changes to the master, you'll first make a visible change to the application to simulate a new version update. This will kick off the pipeline.

## Update app and start pipeline

You'll change the source code of your app and commit the changes to the master branch. After doing this, the pipeline will automatically kick off and you can monitor each deployment stage from there.

1. Return to your project in DevOps Services and click **EDIT CODE** at top right of the page.
2. Add the lines of code, found below, to the bottom of the **/public/stylesheets/style.css** file in your web IDE. This change will make the corners of the buttons pointed instead of curved.

  ```
   .btn-lg{
       border-radius: 0;
   }
  ```
3. Select **File**, then **Save**.
4. Click the **Git** icon in the left navigation menu to load your Git dashboard.
5. Enter a commit message, select all files, and press **Commit**.
6. Push the change to the master branch.

Pushing code to the master branch will kick off your pipeline. You can monitor the deployment under **BUILD AND DEPLOY**. For descriptions about each stage the app goes through to get to production, check out the **About the pipeline** section.

## About the pipeline

This section describes each stage of the pipeline and how it demonstrates DevOps and continuous integration.

### Build stage

In this stage, `npm install` is run to install dependencies and a commit message is sent to Slack with the webhooks. Check your Slack channel to view the commit message. It will tell you the name of the last commit being pushed into the pipeline under the name **incoming-webhook**.

### Linting and unit test stage

In this stage, syntax is checked by JSLint and CSSLint with the npm modules JSHint and CSSLint. The test results are written to junit-xml, which can be seen in the **Tests** tab of **View logs and history**.

You can configure JSLint by editing the **.jshintrc** file in the root directly of your DevOps Services project. For more examples, visit http://jshint.com/docs.

The mocha test run is a simple test that creates a server and waits for callback that it was successful. Behavioral driven tests will be in the testing environment.

### Push to test stage

This stage pushes the new version of Blue Messenger to a Cloud Foundry app with the test extension. A test Cloudant database is also created to properly demonstrate an enterprise toolchain where the production database is not linked until a production push happens.

### Performance test stage

In the **Performance test with BlazeMeter** tile, performance testing is completed with Taurus and BlazeMeter. You can monitor the testing pass/fail status in **View logs and history**. Once the stage finishes, a link will load and you can view a graphical representation of your test results on the BlazeMeter website. The scripts that are sent to BlazeMeter for performance testing are in the **performanceTest.yml** file in the root directory of your DevOps Services project. In this configuration file, you set the pass/fail thresholds in **criteria** under **reporting**. You can change the milliseconds and duration of time in average response time (avg-rt) or the percentage of fails (fail) with the duration.

### Selenium test stage

In the **Sauce Labs selenium test with database check** stage, a selenium test is run on the front end to send a message to the Cloudant test database using Sauce Labs. After that, a mocha test is run to check that there is a value in the newly created test database. The Sauce Labs artifacts are uploaded to the **ARTIFACTS** tab in **View logs and history**. The mocha test results are written to junit-xml, which you can view in the **TEST** tab in **View logs and history**. You can view the scripts run in this stage within the test/sauce folder in the root directory of your DevOps Services project.

### Delete testing environment stage

In the **Delete testing environment** stage, the test application and database are removed. This is done to demonstrate resource considerations, but it is common for enterprise toolchains to leave their testing environment up 24/7.

### Push to production stage

At this point, the pipeline has gone through testing and the testing environment has been deleted. Now the goal is to push the new version of the Blue Messenger app to production using the Bluemix service **Active Deploy**. The Active Deploy service takes two running apps (the new and old version) and provides a zero-downtime transition. For more information on the service, view the [Active Deploy docs](https://www.ng.bluemix.net/docs/services/ActiveDeploy/index.html).


### Monitor the app

This pipeline provides three different sources of real-time data of your Blue Messenger in production.

- Google Analytics: A link to your data is found at https://ga-dev-tools.appspot.com/account-explorer.
- New Relic: Load the dashboard by selecting the **newrelic** in your application dashboard.
- Monitoring & Analytics: Select the **Monitoring & Analytics** instance in your application dashboard.

### Planning tool

Bluemix provides a planning tool in DevOps Services. Select **TRACK & PLAN** at the top of your project in DevOps Services to use this feature. For more information, view the docs at https://hub.jazz.net/tutorials/trackplan.
