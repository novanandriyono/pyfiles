'use strict';
module.exports = function(options){
return pyfiles(options);
};

function pyfiles(options){
var path = require('path');
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
	var except = options.except;
	if(fs.statSync(dir).isDirectory()){
		if(formatFile === '*'){
			results = fromDirAll(dir, except);
		}else if(formatFile === 'dir'){
			results = justDir(dir, except);
		}else if(srcFiles === true){
			results = searchFile(dir, formatFile, except);
		}else{
			results = fromDir1(dir, formatFile, except);
		}
	}


	function fromDir1(dir,formatFile, except){
		var dir1 = fs.readdirSync(dir);
		for(var i = 0, len1 = dir1.length; i < len1; i++){
			var dirstat1 = dir + '/' + dir1[i];
			var parts = dirstat1.split('.');
			var format = parts[parts.length - 1];
			if((fs.statSync(dirstat1).isFile()) && (format == formatFile) && (exceptThis(dirstat1,except) === true)){
			  	file.push(dirstat1);
			}else if(fs.statSync(dirstat1).isDirectory()){
				fromDir1(dirstat1,formatFile)
			}else{
				// :(sad
			}
		}
		return file;
	}

	function fromDirAll(dir, except){
		var dir1 = fs.readdirSync(dir);
		for(var i = 0, len1 = dir1.length; i < len1; i++){
			var dirstat1 = dir + '/' + dir1[i];
			if((fs.statSync(dirstat1).isFile()) && (exceptThis(dirstat1,except) === true)){
			  	file.push(dirstat1);
			}else if(fs.statSync(dirstat1).isDirectory() && (exceptThis(dirstat1,except) === true)){
				file.push(dirstat1);
				fromDirAll(dirstat1);
			}else{
				// :(sad
			}
		}
		return file;
	}

	function justDir(dir, except){
		var dir1 = fs.readdirSync(dir);
		for(var i = 0, len1 = dir1.length; i < len1; i++){
			var dirstat1 = dir + '/' + dir1[i];
			if((fs.statSync(dirstat1).isDirectory()) && (exceptThis(dirstat1,except) === true)){
			  	file.push(dirstat1);
			  	justDir(dirstat1);
			}else{
				// :(sad
			}
		}
		return file;
	}

	function searchFile(dir,formatFile, except){
		var dir1 = fs.readdirSync(dir);
		for(var i = 0, len1 = dir1.length; i < len1; i++){
			var dirstat1 = dir + '/' + dir1[i];
			if((dirstat1.indexOf(formatFile) !== -1) && (exceptThis(dirstat1,except) === true)){
			  	file.push(dirstat1);
			}else if(fs.statSync(dirstat1).isDirectory()){
				searchFile(dirstat1,formatFile);
			}else{
				// :(sad
			}
		}
		return file;
	}

	function exceptThis(line, except){
		var results = true;
		line = path.normalize(line);
		if(typeof except === 'object'){
			for(var eT = 0, len2 = except.length; eT < len2; eT++){
				var fileExcept = path.normalize(except[eT]);
				if(fileExcept.indexOf(line) !== -1){
					results = false;
				}
			}
		}else{
			results = true;
		}
		return results;

	}
	return results;
}