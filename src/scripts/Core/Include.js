// TODO check double inclusion
var include = function(filePath) {
    var script = document.createElement('script');
    script.setAttribute("type", "text/JavaScript");
    script.setAttribute("language", "JavaScript");
    script.src = filePath;
    console.log('including '+filePath);
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

}
