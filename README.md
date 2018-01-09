# pyfiles

using fs. search the location of a file or folder inside folder using format, results in an object array. Formats used in letters after the point of example .pdf or .doc not use mime. permissions use fs. will be fail if fs fail to access some folder or file bug T_T

## Getting Started

### Installing

```
npm install pyfiles
```

### Using

```
var pyfiles = require('pyfiles');
var formatFile = 'js';
var fromDir = __dirname;
var options = {
	'fromDir': fromDir,
	'formatFile': formatFile,
	'search': false
}
console.log(pyfiles(options));
```

## not goal T_T