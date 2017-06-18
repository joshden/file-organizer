const readdirp = require('readdirp');

var stream = readdirp({ 
	root: '/media/josh/JoshData',
	//root: '/',
	entryType: 'all',
	lstat: true
}).on('data', function(entry) {
	console.log(entry);
});

