function Bullet() {
    /**
     * Bullet represents a bullet : ally or enemy
     *
     * Prototype : GameObject
     *
     * Members :
     * active - false when bullet should be destroyed
     * speed - vertical speed. Allies : up, enemies : down
     */
    this.init = function(x, y, s) {
	this.name = "bullet";
	this.x = x;
	this.y = y;
	this.speed = s;
	this.active = true;
	this.graphics = new Clip();
	if (s > 0) {
	    // speed is >0 = heading to the bottom = enemy bullet
	    this.graphics.init(imageHolder.spritesheet,
			       175, 16,
			       2, 8);
	} else {
	    // speed is <0 = heading to the top = ally bullet
	    this.graphics.init(imageHolder.spritesheet, 
			      175, 0,
			      2, 8);
	}
	this.draw();
    }
    this.update = function() {
	if (this.active) {
	    this.y += this.speed * deltaTime;
	    if (this.y > 600 || this.y < -8)
		this.active = false;
	    this.draw();
	}
    }
}
Bullet.prototype = new GameObject();
