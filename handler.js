'use strict';

const request = require('request');

module.exports.invite = (event, context, callback) => {

    const slackTeamName = process.env.SLACK_TEAM_NAME;
    const slackToken = process.env.SLACK_TOKEN;
    const email = event.body.email;

    if (!slackTeamName || !slackToken || !email) {
        callback(null, {
            statusCode: 400
        });
    }

    request.post({
                     url: 'https://' + slackTeamName + '.slack.com/api/users.admin.invite',
                     form: {
                         email: email,
                         token: slackToken,
                         set_active: true
                     }
                 }
        , function (err, httpResponse, body) {
            // body looks like:
            //   {"ok":true}
            //       or
            //   {"ok":false,"error":"already_invited"}
            let responseText = "";

            if (err) {
                responseText = 'Error:' + err;
            }
            body = JSON.parse(body);
            if (body.ok) {
                responseText = "Successfully invited";
            } else {
                var error = body.error;
                if (error === 'already_invited' || error === 'already_in_team') {
                    responseText = 'Success! You were already invited.';
                } else if (error === 'invalid_email') {
                    responseText = 'The email you entered is an invalid email.';
                } else if (error === 'invalid_auth') {
                    responseText =
                        'Something has gone wrong. Please contact a system administrator.';
                }
            }

            callback(null, {
                statusCode: 200,
                body: responseText
            });
        });
};
