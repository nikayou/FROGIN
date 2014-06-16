/**
 * GameObjects are objects held by a scene. They can be updated and drawn
 */
function GameObject() {
    this.init = function(name) {
	this.name = name;
    };
    this.update = function() {
    };
    this.draw = function() {
	this.graphics.draw(this.context, this.x, this.y);
    };
    this.exit = function() {};
}

/**
 * Background is the bottom layer. 
 * x, y : position on the canvas
 * speedX, speedY : movement
 * graphics : imageClip
 */
function Background() {
    this.init = function(name, x, y, sX, sY) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.speedX = sX;
	this.speedY = sY;
	this.graphics = new Sprite();
	this.graphics.init(imageHolder.background, 0, 0, 800, 600);
    };
    this.update = function() {
	this.x += this.speedX;
	this.y += this.speedY;
	if (this.y <= -600 || this.y > 600) {
	    this.y = 0;
	}
    };
    this.draw = function() {
	this.graphics.draw(this.context, this.x, this.y);
	this.graphics.draw(this.context, this.x, this.y - this.canvasHeight);
	this.graphics.draw(this.context, this.x, this.y + this.canvasHeight);
    };
}
Background.prototype = new GameObject();


function Player() {
    this.init = function(name, x, y) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.graphics = new Sprite();
	this.graphics.init(imageHolder.spritesheet, 128, 96, 32, 32);
    }
    this.update = function() {
	Player.prototype.update();
    }
}
Player.prototype = new GameObject();
