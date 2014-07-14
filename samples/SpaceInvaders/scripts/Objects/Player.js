include(scriptsPath+"Core/GameObject.js");
include(scriptsPath+"Rendering/Clip.js");

function Player() {
    /**
     * Player represents the player's ship.
     *
     * Prototype : GameObject
     *
     * Members : 
     * -
     */
    this.init = function(name, x, y) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.health = 4;
	this.graphics = new Clip();
	this.graphics.init(textureManager.get("spritesheet"), 
			   128, 96, 
			   32, 32);	
	document.getElementById("canvas_ally").style.left = this.x+'px';
	document.getElementById("canvas_ally").style.top = this.y+'px';
	this.clearAndDrawRelative();
    }
    this.update = function() {
	Player.prototype.update();
    }
    this.move = function(x) {
	// checking if ship would go out of bounds
	var amount = x * deltaTime;
	var dest = this.x + amount;
	if (dest <= 0) {
	    dest = 0;
	} else if (dest >= 800-32){
	    dest = 800 - 32;
	}
	if (dest != this.x) {
	    this.x = dest;
	    document.getElementById("canvas_ally").style.left = this.x+'px';
	    document.getElementById("canvas_ally").style.top = this.y+'px';
	    this.clearAndDrawRelative();
	}
    }
}
Player.prototype = new GameObject();
