# pyfiles
get file or folder locations using 'fs', results by array
## Getting Started
### Installing
Installing pyfiles.
```
npm install pyfiles
```
## How to use
| Code | Description |
|------|------|
|a| directory. |
|b| recursive boolean (true or false), false by default |
|c| filter name, type N by default | 
|d|  filter items. empty array by default |
|e| item result from r |
|f| item filter from d |
|g| directory name of e |
|r| object pyfiles results |
|r.all| object all file and directory from r|
|r.files| get all file from r |
|r.dirs| get all directory from r |
### Using Require
```
consr pyfiles = require('pyfiles');
const a = 'directory_address';
const b = true; // recursive
const c = 'include-extension' // filter type;
const d = ['php','js'] // f;
const r = new pyfiles(a,b,c,d);

const all = r.all; // all results
const files = r.files; // all file results
const dirs = r.dirs; // all dir results

console.log("total results all: " + all.length);
console.log("total results files: " + files.length);
console.log("total results dirs: " + dirs.length);

console.log("results dirs:\n");
console.log(dirs);

console.log("results files:\n");
console.log(files);

console.log("results all:\n");
console.log(all);
```
### Filters
pyfiles have include,exclude and N filter type name for filtering item result. N default for deactive pyfile filter.
### Filter Include
| Name | Description |
| ------ | ------ |
| include-equals | filter e === f |
| include-dir-equals | filter e === g + f |
| include-indexof | filter using indexOf [e.indexOf(f) !== -1] |
| include-dir-indexof | filter using indexOf [e.indexOf( g + f ) !== -1] |
| include-indexof-first | filter using indexOf from e first index |
| include-dir-indexof-first | filter using indexOf from e first index use g + f |
| include-regex | filter using match [e.match( f )] |
| include-extension | filter using path.extname [path.extname(e) === f] |
### Filter Exclude
| Name | Description |
| ------ | ------ |
| exclude-equals | filter e === f |
| exclude-dir-equals | filter e === g + f |
| exclude-indexof | filter using indexOf [e.indexOf(f) !== -1] |
| exclude-dir-indexof | filter using indexOf [e.indexOf( g + f ) !== -1] |
| exclude-indexof-first | filter using indexOf from e first index |
| exclude-dir-indexof-first | filter using indexOf from g + e first index use g + f |
| exclude-regex | filter using match [e.match( f )] |
| exclude-extension | filter using path.extname [path.extname(e) === f] |
### Filter N
| Name | Description |
| ------ | ------ |
| N | default |
## Using Cli
for now cli not support for filtering
```
npm run pyfiles arg1 arg2 arg3
```
 1. arg1 = dirname.
 2. arg2 = all,files,dirs by default all.
 3. arg3 = reqursive boolean (true or false), false by default

License
----
MIT
