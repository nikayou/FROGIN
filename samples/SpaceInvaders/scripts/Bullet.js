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
     * BulletPool manages the construction, spawning, and destruction of bullets
     * assuming the fact that there is a limit of bullet.
     *
     * Members : 
     * MAX_UNITS - maximum number of bullets that can be present at the same 
     *             time
     * units - array containing all bullets with a state : active/inactive
     *
     * How it works : 
     * creation of objects is a long task, so we prefer to do it at the 
     * beginning of the game, and enable these objects on demand. 
     * When we need an object, it is taken at the end : active objects are 
     * located at the front of the array, inactive objects are located 
     * at the end of the array. 
     */
    var MAX_UNITS = 0;
    this.units = []

    /**
     * Creates 'max' bullets initialised with the given args, and sets them
     * as 'inactive'. 
     */
    this.init = function(max, args) {
	MAX_UNITS = max;
	for (var i = 0; i < MAX_UNITS; i++) {
	    var u = new Bullet();
	    u.init(u, args);
	    u.active = false;
	    this.units[i] = u;
	}
    }

    /**
     * Activates a bullet with the given args and returns it.
     * If no bullet can be activated, 'null' is returned. 
     */
    this.spawn = function(args) {
	console.log("spawning bullet at "+args);
	var unit = this.units[MAX_UNITS-1];
	if(!unit.active) {
	    unit.active = true;
	    unit.reset.apply(unit, args);
	    this.units.unshift(this.units.pop());
	    return unit;
	}
	return null;
    }
    this.despawn = function(i) {
	this.units.push((this.units.splice(i,1))[0]);
    }
    this.update = function() {
	var s="update "+MAX_UNITS+"\n{";
	for (var i = 0; i < MAX_UNITS; i++) {
	    s += i+":";
	    if(this.units[i].active)
		s += "1";
	    else
		s += "0";
	    s += ",";
	    if (this.units[i].update()) {
		this.units[i].draw();
	    }else {
		this.despawn(i);
		this.active = false;
	    }
	}
	s+="}";
//	console.log(s);
    }
}
