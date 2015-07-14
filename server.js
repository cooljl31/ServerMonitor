

var cronJob = require('cron').CronJob;
var job = new cronJob({
    cronTime: '*/5 * * * *', // Run every 5 minutes.
    onTick: function() { 
    	console.log('Running!');
    	console.log(new Date());
    }, 
    start: true,
});