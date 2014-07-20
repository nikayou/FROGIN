include(scriptsPath+"Core/AssetManager.js");

function TextureManager() {
}
TextureManager.prototype = new AssetManager();
TextureManager.prototype.createObject = function() {
    var obj = new Image();
    return obj;
}
TextureManager.prototype.loadFromFile = function(filePath) {
    var obj = this.createObject();
    obj.src = filePath; 
    this.add(filePath, obj);
}
TextureManager.prototype.loadWithID = function(filePath, id) {
    var obj = this.createObject();
    obj.src = filePath;
    this.add(id, obj);
}
var textureManager = new TextureManager();
