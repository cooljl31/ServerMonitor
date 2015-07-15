//
// Config file for the server monitor.
//

module.exports = {
	notifications: {
		recipients: [
			'<who-to-email>',
		],
		from: '<who-the-email-is-from',
	},
	email: {
		auth: {
		    user: '<email-user-name>',
		    pass: '<email-password>',
		},
	},
};
