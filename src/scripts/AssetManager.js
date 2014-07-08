function AssetManager() {
    /**
     * AssetManager holds loaded assets, to avoid loading the same file 
     * multiple times. 
     * It it a template and thus is not usable without defining
     * function "createObject", which must return a valid object. 
     *
     * Members :
     * assets - loaded assets mapped to the file's name
     */

    this.assets = [];
    
    // loads all files in the given list
    this.init = function(l) {
	for (i in l) {
	    this.loadFromFile(l);
	}
    };

    // load all files in the given pair list (file, id)
    this.initWithIDs = function(l) {
	// TODO
/*	for (f in l) {
	    this.loadWithID(f, i);
	}*/
    };

    // add a file with a given key, 
    this.add = function(key, asset) {
	this.assets[key] = asset;
    };

    // creates a file (overload) and maps it to its name
    this.loadFromFile = function(filePath) {
	var obj = this.createObject(); // undefined here
	obj.loadFromFile(filePath);
	this.assets[filePath] = obj;
    };

    // creates a file (overload) and maps it to the given id
    this.loadWithID = function(filePath, id) {
	var obj = this.createObject(); // undefined here
	console.log("loading "+filePath);
	obj.loadFromFile(filePath);
	this.assets[id] = obj;
    };

    // returns the asset associated with the given key
    this.get = function(key) {
	return this.assets[key];
    };
    
    // nullifies the given key (effect: asset not accessible anymore via this)
    this.remove = function(key) {
	this.assets[key] = null;
    };

    // removes all objects of the manager
    this.clean = function() {
	this.assets = [];
    };
    
    // removes every asset whose id is not in the given list
    this.keep = function(l) {
	for (i in this.assets) {
	    if (!i in l) {
		this.assets[i] = null;
	    }
	}
    };

    // returns the number of assets already loaded
    this.getCount = function() {
	return this.assets.length;
    };

}
