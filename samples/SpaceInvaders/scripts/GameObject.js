function GameObject() {
    this.init = function(name) {
	this.name = name;
    };
    this.update = function() {};
    this.draw = function() {};
    this.exit = function() {};
}

function Background() {
    this.init = function(name, x, y, sX, sY) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.speedX = sX;
	this.speedY = sY;
	this.sprite = new Sprite();
	this.sprite.init(imageHolder.background, 0, 0, 800, 600);
    };
    this.update = function() {
	this.x += this.speedX;
	this.y += this.speedY;
    };
    this.draw = function() {
	this.sprite.draw(this.context, this.x, this.y);
	this.sprite.draw(this.context, this.x, this.y - this.canvasHeight);
    };
}
Background.prototype = new GameObject();
