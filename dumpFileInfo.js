const readdirp = require('readdirp');
const fs = require('fs');
const path = require('path');

const filesPath = path.resolve(__dirname, 'windows_files.json');
const objPathsAndTypes = {};
const fileSystem = {};


fs.writeFileSync(filesPath, '[');
var stream = readdirp({ 
	// root: '/media/josh/JoshData',
	// root: '/',
	root: 'D:\\',
	entryType: 'all',
	lstat: true
}).on('data', function(entry) {
	fs.appendFileSync(filesPath, JSON.stringify(entry, null, 2) + ',');
	logObjPathsAndTypes('$', entry);
}).on('end', function() {
	fs.appendFileSync(filesPath, '{}]');
	console.log(JSON.stringify(objPathsAndTypes, null, 2));
});


function logObjPathsAndTypes(objPath, obj) {
	const type = Object.prototype.toString.call(obj);

	if (! objPathsAndTypes.hasOwnProperty(objPath)) {
		objPathsAndTypes[objPath] = {};
	}
	if (! objPathsAndTypes[objPath].hasOwnProperty(type)) {
		objPathsAndTypes[objPath][type] = 0;
	}
	objPathsAndTypes[objPath][type]++;

	if (Array.isArray(obj)) {
		obj.forEach(value => {
			logObjPathsAndTypes(`${objPath}[]`, value);
		});
	}
	else if (typeof obj !== 'string' && typeof obj !== 'undefined') {
		Object.keys(obj).forEach(key => {
			logObjPathsAndTypes(`${objPath}.${key}`, obj[key]);
		});
	}
}