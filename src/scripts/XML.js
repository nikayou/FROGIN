function readXML(filePath) {
    if (window.XMLHttpRequest) {
	xmlhttp = new XMLHttpRequest();
    } else {
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.readyState == 4)
	return xmlhttp.responseXML;
};
