'use strict';
const fs = require('fs');
const path = require('path');

module.exports = function(_s,_r=false, _t = 'N',_v = []){
	return new pyfiles(_s,_r,_t,_v);
}

function pyfiles(_s,_r=false, _t = 'N',_v = []){
	
	fs.access(_s, (err) => {
		if(err){
			console.error('not have access');
			return undefined;
		}
	});

	if(!fs.statSync(_s).isDirectory()){
		console.error('Not directory');
		return undefined;
	}

	var i = 0;
	var _vir = [];
	/**
	 * [_t type fillter]
	 * @type {Array}
	 */
	_t = [
	'N',
	'include-equals',
	'include-dir-equals',
	'include-indexof',
	'include-dir-indexof',
	'include-indexof-first',
	'include-dir-indexof-first',
	'include-regex',
	'exclude-equals',
	'exclude-dir-equals',
	'exclude-indexof',
	'exclude-dir-indexof',
	'exclude-indexof-first',
	'exclude-dir-indexof-first',
	'exclude-regex'
	].includes(_t)?_t:'N'; 

	if(_v.length > 0){
		for (i = _v.length - 1; i >= 0; i--) {
			_vir[i] = path.normalize(_s + path.sep + _v[i]);
		}
	}

	var fsrs = fs.readdirSync(_s);

	function getstat(str){
		fs.access(str, (err) => {
			if(err){
				console.error("not have access to " + str);
				return undefined;
			}
		});
		return fs.statSync(str);
	}

	function filters(str){
		if(_t === 'N'){
			return false;
		}
		if(_v.length > 0){
			if(_v.length === 1){
				return typeFiltersItem(str,0);
			}
			return typeFilters(str);
		}
		return false;	
	}

	function typeFiltersItem(str,i = 0){
			if(_t === 'include-equals'){
				if(str === _v[i]){
					return true;
				}
				return false;
			}

			if(_t === 'include-dir-equals'){
				if(str === _vir[i]){
					return true;
				}
				return false;
			}

			if(_t === 'include-indexof'){
				if(str.indexOf(_v[i]) !== -1){
					return true;
				}
				return false;
			}

			if(_t === 'include-dir-indexof'){
				if(str.indexOf(_vir[i]) !== -1){
					return true;
				}
				return false;
			}

			if(_t === 'include-indexof-first'){
				if(str.indexOf(_v[i],0) !== -1){
					return true;
				}
				return false;
			}

			if(_t === 'include-dir-indexof-first'){
				if(str.indexOf(_vir[i],0) !== -1){
					return true;
				}
				return false;
			}

			// EX
			if(_t === 'exclude-equals'){
				if(str === _v[i]){
					return true;
				}
				return false;
			}

			if(_t === 'exclude-dir-equals'){
				if(str === _vir[i]){
					return true;
				}
				return false;
			}

			if(_t === 'exclude-indexof'){
				if(str.indexOf(_v[i]) !== -1){
					return false;
				}
				return true;
			}

			if(_t === 'exclude-dir-indexof'){
				if(str.indexOf(_vir[i]) !== -1){
					return false;
				}
				return true;
			}

			if(_t === 'exclude-indexof-first'){
				if(str.indexOf(_v[i],0) !== -1){
					return false;
				}
				return true;
			}

			if(_t === 'exclude-dir-indexof-first'){
				if(str.indexOf(_vir[i],0) !== -1){
					return false;
				}
				return true;
			}

			var match = str.match(_v[i]);
			
			if(_t === 'include-regex'){
				if(match !== null){
					return true
				}
				return false;
			}

			if(_t === 'exclude-regex'){
				if(match === null){
					return true
				}
				return false;
			}
		console.error('unknow options filter');
		return false;
	}

	

	function typeFilters(str){
		for (i = _v.length - 1; i >= 0; i--) {
			if(typeFiltersItem(str,i)){
				return true;
			}
		}
		return false;
	}

	var all = [];
	var files = [];
	var dirs = [];
	
	for(i = fsrs.length - 1; i >= 0; i--) {
		
		fsrs[i] = path.normalize(_s + path.sep + fsrs[i]);
		
		var bool = filters(fsrs[i]);
		
		var stat = getstat(fsrs[i]);
		
		if(bool){
			all.push(fsrs[i])
		}

		if(stat.isFile() && bool === true){
			files.push(fsrs[i]);
		}

		if(stat.isDirectory() && bool === true){
			dirs.push(fsrs[i]);
		}
		
		if(_r===true && stat.isDirectory()){
			var newi = new pyfiles(fsrs[i],_r,_t,_v);
			Array.prototype.push.apply(files,newi.files);
			Array.prototype.push.apply(dirs,newi.dirs);
			Array.prototype.push.apply(all,newi.all);
		}
	}

	Object.defineProperty(this, "files", {
		value: files, 
		writable: false 
	});

	Object.defineProperty(this, "dirs", {
		value: dirs, 
		writable: false 
	});
	
	Object.defineProperty(this, "all", {
		value: all, 
		writable: false 
	});
	return this;
}