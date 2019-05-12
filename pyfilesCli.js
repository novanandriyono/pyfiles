'use strict';
module.exports = new pyfilesC(process.argv);
function pyfilesC(argvs){
	
	if((argvs && typeof argvs === 'object' && argvs.constructor === Array) !== true){
		console.errors("empty input");
		return undefined;
	}

	if(typeof(argvs[2]) !== "string"){
		console.errors("argument 1 must be string");
		return undefined;
	}
	
	argvs[2] = require("path").normalize(argvs[2]);	
	
	argvs[3] = ["all","files","dirs"].includes(argvs[3])?argvs[3]:"all";
	
	argvs[4] = argvs[4] === "true"?true:false;
	
	return argvs[3]==="files"?require("./index.js")(argvs[2],argvs[4]).files:
	argvs[3]==="dirs"?require("./index.js")(argvs[2],argvs[4]).dirs:
	argvs[3]==="all"?require("./index.js")(argvs[2],argvs[4]).all:
	require("./index.js")(argvs[2],argvs[4]).all;
}