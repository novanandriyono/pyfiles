var pyfiles = require('./index.js');
var res = pyfiles(__dirname,false,'include-extension',['js','json']);
console.log("jumlah semua file yang diketemukan: " + res.files.length);
console.log("jumlah semua folder yang diketemukan: " + res.dirs.length);
console.log(res.files);
