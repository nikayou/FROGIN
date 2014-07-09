/**
 * This file is the main script : it creates the game, initializes it, 
 * and handles the loop.
 * 
 * Variables : 
 * game - current instance of the game
 * textureManager - image manager, loading required images
 * deltaTime - time elapsed since last frame
 */
include(scriptsPath+"Core/AssetManager.js");

var game = new Game();

function startGame(s) {
    /**
     * Initializes the game
     */
    game.init(s);
};


/**	
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop, 
 * otherwise defaults to setTimeout().
 */
// TODO : don't need to check everytime, can just store the good API
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   || 
	window.webkitRequestAnimationFrame || 
	window.mozRequestAnimationFrame    || 
	window.oRequestAnimationFrame      || 
	window.msRequestAnimationFrame     || 
	function(callback, 
		 element){
	    window.setTimeout(callback, 1000 / 60); // handle FPS
	};
})();


/**
 * Function to call every frame
 */
function loop() {
    game.loop();
    // TODO: check validation
    requestAnimFrame(loop);
}

var deltaTime = 0.0;

function Game() {
    /**
     * Game is an encapsulation for general game instance infos. 
     * 
     * Members :
     * scene - current scene, being updated and rendered
     */
    this.init = function(s) {
	this.scene = s;
	this.scene.init();
	requestAnimFrame(loop);
    };

    this.update = function() {
	updateDeltaTime();
	this.scene.update();
    };

    var previous = Date.now();
    var updateDeltaTime = function() {
	var now = Date.now();
	deltaTime = (now-previous)/1000;
	previous = now;
    };

    this.draw = function() {
	// nothing here
    };

    this.exit = function() {
	this.scene.exit();
    };

    /**
     * Called every frame, just computes the new state as a scene and renders it
     */
    this.loop = function() {
	this.update();
	this.draw();
    };
}



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
    this.assets[filePath] = obj;
}
TextureManager.prototype.loadWithID = function(filePath, id) {
    var obj = this.createObject();
    obj.src = filePath;    
    this.assets[id] = obj;
}
var textureManager = new TextureManager();
