const readdirp = require('readdirp');
const path = require('path');
//const es = require('event-stream');

var stream = readdirp({ 
	root: '/media/josh/JoshData',
	entryType: 'all',
	lstat: true
}).on('data', function(entry) {
	console.log(entry);
});

