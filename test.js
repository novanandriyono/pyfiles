var pyfiles = require('./index.js');
var options = {
	'fromDir': __dirname,
	'formatFile': 'js',
	'srcFiles': false,
}
console.log(pyfiles(options));
