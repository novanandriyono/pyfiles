'use strict';
module.exports = function(options){
return pyfiles(options);
};

function pyfiles(options){
var fs = require('fs');
var file = [];
	if(typeof options !== 'object'){
		return console.log('not valid options');
	}
	if((typeof options.fromDir == 'undefined')
		&& (typeof options.formatFile == 'undefined')){
		return options.formatFile || options.fromDir;
	}
	var results = undefined;
	var dir = options.fromDir;
	var formatFile = options.formatFile;
	var srcFiles = options.srcFiles;
	if(fs.statSync(dir).isDirectory()){
		if(formatFile === '*'){
			results = fromDirAll(dir);
		}else if(formatFile === 'dir'){
			results = justDir(dir);
		}else if(srcFiles === true){
			results = searchFile(dir, formatFile);
		}else{
			results = fromDir1(dir, formatFile);
		}
	}


	function fromDir1(dir,formatFile){
		var dir1 = fs.readdirSync(dir);
		for(var i = 0, len1 = dir1.length; i < len1; i++){
			var dirstat1 = dir + '/' + dir1[i];
			var parts = dirstat1.split('.');
			var format = parts[parts.length - 1];
			if((fs.statSync(dirstat1).isFile()) && (format == formatFile)){
			  	file.push(dirstat1);
			}else if(fs.statSync(dirstat1).isDirectory()){
				fromDir1(dirstat1,formatFile)
			}else{
				// :(sad
			}
		}
		return file;
	}

	function fromDirAll(dir,formatFile){
		var dir1 = fs.readdirSync(dir);
		for(var i = 0, len1 = dir1.length; i < len1; i++){
			var dirstat1 = dir + '/' + dir1[i];
			if(fs.statSync(dirstat1).isFile()){
			  	file.push(dirstat1);
			}else if(fs.statSync(dirstat1).isDirectory()){
				fromDirAll(dirstat1);
			}else{
				// :(sad
			}
		}
		return file;
	}

	function justDir(dir){
		var dir1 = fs.readdirSync(dir);
		for(var i = 0, len1 = dir1.length; i < len1; i++){
			var dirstat1 = dir + '/' + dir1[i];
			if(fs.statSync(dirstat1).isDirectory()){
			  	file.push(dirstat1);
			  	justDir(dirstat1);
			}else{
				// :(sad
			}
		}
		return file;
	}

	function searchFile(dir,formatFile){
		var dir1 = fs.readdirSync(dir);
		for(var i = 0, len1 = dir1.length; i < len1; i++){
			var dirstat1 = dir + '/' + dir1[i];
			if(dirstat1.indexOf(formatFile) !== -1){
			  	file.push(dirstat1);
			}else if(fs.statSync(dirstat1).isDirectory()){
				searchFile(dirstat1,formatFile);
			}else{
				// :(sad
			}
		}
		return file;
	}

	return results;
}