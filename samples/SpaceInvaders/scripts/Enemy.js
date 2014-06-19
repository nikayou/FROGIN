function Enemy() {
    /**
     * Enemy represents an enemy
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
	this.graphics = new Clip();
	this.graphics.init(imageHolder.spritesheet, 0, 0, 32, 32);
    }
    this.update = function() {
	Enemy.prototype.update();
    }
}
Enemy.prototype = new GameObject();
