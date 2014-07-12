
var includedFiles = [];
(function(){
    var scripts = document.getElementsByTagName("script");
    for (i in scripts) {
	includedFiles[scripts[i].src] = true;
    }
})();

var include = function(filePath) {
    if (!includedFiles[filePath]) {
	includedFiles[filePath] = true;
	var script = document.createElement('script');
	script.setAttribute("type", "text/JavaScript");
	script.setAttribute("language", "JavaScript");
	script.src = filePath;
	var scriptsNode = document.getElementById('scripts');
	// if a "scripts" container exists, the script is added to it. 
	// otherwise, it is added to "head"
	var node = null;
	if (scriptsNode){
	    node = scriptsNode[0];
	} else {
	    node = document.getElementsByTagName('head')[0];
	}
	node.insertBefore(script, node.childNodes[0]);
    }else{
	console.log('will not include "'+filePath+'" twice');
    }
};

