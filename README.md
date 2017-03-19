# Serverless Slack User Invitation

- Clone or download the repository
- In repository's folder run `npm install` command
- Install Serverless.js for easy deployment, it will deploy lambda function and create an API Gateway endpoint automatically
- Run `npm install -g serverless` to install `serverless` globally
- [Follow these instructions on setting up AWS credentials for Serverless](https://serverless.com/framework/docs/providers/aws/guide/credentials/) if you haven't done already
- Copy `sampleDeploy.sh` as `deploy.sh` and update slack token and team name properties
- Or just run `serverless deploy --SLACK_TOKEN yourtokenhere --SLACK_TEAM_NAME slackteamnamehere` from the terminal
- Get your legacy slack token that you will use to invite users from [here](https://api.slack.com/custom-integrations/legacy-tokens)
- You can always take it back by running serverless remove command
- That is it! Now, you can use the endpoint to make ajax post request to invite users. Post request expects `{email: 'email@email.com'}` in the body

*Note:* just as a sample, I've created `index.html` with Vue.js.
It can be used as a starting point for your invitation page's frontend.
You just need to update `inviteEndpoint` and upload it to s3 and make it public to use it.

**Demo:** https://s3-us-west-2.amazonaws.com/serverless-turkey/index.html