var pyfiles = require('./index.js');

var res = pyfiles("E:\\github\\novanandriyono\\lexcache",true);
console.log("jumlah semua file yang diketemukan: " + res.files.length);
console.log("jumlah semua folder yang diketemukan: " + res.dirs.length);
