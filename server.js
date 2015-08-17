
var request = require('request-promise');
var mailer = require('./mailer');
var config = require('./config');

mailer.notify({
	subject: config.name + " has restarted.",
	text: config.name + " online at " + new Date().toString(),
});

var CronJob = require('cron').CronJob;
new CronJob({
    cronTime: '*/5 * * * *', // Run every 5 minutes.
    onTick: function() { 
    	console.log('Frequent server check!');
    	console.log(new Date());

    	config.hostsToCheck.forEach(function (hostUrl) {
    		try {
	    		request({
	    				method: 'GET',
	    				uri: hostUrl,
	    				resolveWithFullResponse: true,
	    				rejectUnauthorized: false, //todo: Want to be able to handle proper certificates as well.
	    			})
	    			.then(function (result) {
	    				if (result.statusCode === 200) {
	    					console.log(hostUrl + ' is ok.');
	    				}
	    				else {
	    					console.error('Problem with ' + hostUrl + ', returned status code: ' + result.statusCode);	

	    					mailer.notify({
    							subject: config.name + ": Problem with host",
    							text: config.name + ": Host " + hostUrl + " is not responding, returned status code: " + result.statusCode,
	    					});
	    				}
	    			})
	    			.catch(function (err) {
	    				console.error('An error occurred checking ' + hostUrl);
	    				console.error(err.stack);

    					mailer.notify({
							subject: config.name + ": Problem with host",
							text: config.name + ": An error occurred contacting host " + hostUrl,
    					});
	    			});
	    	}
	    	catch (ex) {
				console.error('An exception occurred checking ' + hostUrl);
				console.error(ex.stack);

				mailer.notify({
					subject: config.name + ": Problem with host",
					text: config.name + ": An exception occurred contacting host " + hostUrl,
				});
	    	}
    	});
    }, 
    start: true,
});

