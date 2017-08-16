const jsonfile = require('jsonfile');

const allFiles = jsonfile.readFileSync('windows_files.json');
console.log(allFiles.length);