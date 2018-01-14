var path = require('path');
var pyfiles = require('./index.js');
var except1 = __dirname + path.sep + 'index.js';
var except2 = __dirname + path.sep + '.git';
var options = {
	'fromDir': __dirname,
	'formatFile': 'file',
	'srcFiles': false,
	'except': [except1,except2],
}
console.log(pyfiles(options));
