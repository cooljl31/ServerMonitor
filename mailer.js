
'use strict';

var nodemailer = require("nodemailer");
var config = require('./config');
var smtpTransport = require('nodemailer-smtp-transport');

var transport = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: config.email.auth.user,
			pass: config.email.auth.pass,
		},
	});

module.exports = {
	notify: function (msg) {
		transport.sendMail({
			to: config.notifications.recipients,
			from: config.notifications.from,
			subject: msg.subject,
			text: msg.text,
			attachments: msg.attachments || [],
		}, function (err, response) {

			if (err) {
				console.error('Error occured sending notification email');
				console.error(err.stack);
			}
			else {
				console.log("Notification sent: ");
				console.log(response);
			}
		});
	},
};