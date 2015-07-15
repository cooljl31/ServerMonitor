//
// Config file for the server monitor.
//

module.exports = {
	name: '<name-for-this-monitor>',
	hostsToCheck = [
		'http://www.google.com',
	],
	notifications: {
		recipients: [
			'<who-to-email>',
		],
		from: '<who-the-email-is-from>',
	},
	email: {
		auth: {
		    user: '<email-user-name>',
		    pass: '<email-password>',
		},
	},
};
