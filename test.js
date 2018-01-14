var path = require('path');
var pyfiles = require('./index.js');
var except1 = __dirname + path.sep + 'index.js';
var except2 = __dirname + path.sep + 'test.js';
var options = {
	'fromDir': __dirname,
	'formatFile': '*',
	'srcFiles': false,
	'except': [except1,except2],
}
console.log(pyfiles(options));
