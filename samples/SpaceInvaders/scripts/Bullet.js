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
	this.width = 2;
	this.height = 8;
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
    }

    /**
     * Updates the bullet if active, but also returns its state : the pool 
     * needs it, as inactive bullets should be located at its end. 
     */
    this.update = function() {
	if (this.active){
	    this.y += this.speed * deltaTime;
	    if (this.y > 600 || this.y < -16)
		this.active = false;
//	    this.draw();
	}
	return this.active;
	
    }
    this.setPosition = function(x, y) {
	this.x = x;
	this.y = y;
    }
    this.setSpeed = function(s) {
	this.speed = s;
    }
    this.reset = function(x, y, s) {
     	this.x = x;
	this.y = y;
	this.speed = s;
    }
}
Bullet.prototype = new GameObject();


function BulletPool() {
    /**
     * BulletPool is a Pool specialised with Bullets.
     *
     * Prototype : Pool
     */
}
BulletPool.prototype = new Pool();
BulletPool.prototype.createUnit = function(args){
    var r = new Bullet();
    r.init(args);
    return r; 
};

