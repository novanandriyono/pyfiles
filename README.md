# mdc-sass-theme

Catch the location of a file inside folder using format, results in an object array. Formats used in letters after the point of example .pdf or .doc not use mime.

## Getting Started

### Installing

```
npm install pyfiles
```

### Using

```
var pyfiles = require('pyfiles');
var formatFile = 'js';
var fromDir = __dirname + '/node_modules/@material';
var options = {
	'fromDir': fromDir,
	'formatFile': formatFile
}
console.log(pyfiles(options));
```

## not goal T_T