function Background() {
    /**
     * Background is the bottom layer of levels. 
     *
     * Prototype : GameObject     
     *
     * Members : 
     * x, y - position on the canvas
     * speedX, speedY - movement
     * graphics - imageClip
     */
    this.init = function(name, x, y, sX, sY) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.speedX = sX;
	this.speedY = sY;
	this.graphics = new Sprite();
	this.graphics.init(textureManager.get("background"));
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
