function Enemy() {
    /**
     * Enemy represents an enemy
     *
     * Prototype : GameObject
     *
     * Members : 
     * level - number of hits to take + appearance
     * health - number of hits left before dying
     */
    this.init = function(name, x, y, lvl) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.collider = new BoxCollider();
//	console.log("ctor : "+this+" -> "+this.collider);
	this.collider.init(x, y, 32, 32);
//	console.log("init : "+this+" -> "+this.collider);
	this.level = -1;
	this.graphics = new Clip();
	this.changeLevel(lvl);
	this.health = this.level;
    }
    this.update = function() {
	return true;
    }
    this.changeLevel = function(lvl) {
	if (this.level != lvl) {
	    this.graphics.init(imageHolder.spritesheet, 32*(lvl-1), 0, 32, 32);
	}
    }
    this.move = function(x, y) {
	this.x += x;
	this.y += y;
	this.collider.move(x, y);
    }
    this.reset = function(x, y, lvl) {
	this.x = x;
	this.y = y;
	this.collider.x = x;
	this.collider.y = y;
	this.changeLevel(lvl);	
    }
}
Enemy.prototype = new GameObject();


/**
 * The different patterns enemies can spawn with. 
 * They all should be shifted by at least 40px. 
 * Format : 
 * "180-100:" - top-left point, where the wave starts
 * "1234" - level of the enemy
 * "|" - new line
 */
PATTERNS = [
"180-100:44444444444|33333333333|22222222222|11111111111|11111111111", 
"64-32:00000400000400000|00000000000000000|00400000400000400|03030003030003030|20202020202020202|00000000000000000|12121012121012121|11111011111011111", 
"180-0:00001410000|00010001000|00102220100|01020302010|10203430201|40234443204|10203430201|01020302010|00102220100|00010001000|00001410000", 
"20-32:3430343034303430343|0300030003000300030|0023202320232023200|0002000200020002000|0000121012101210000|0000010001000100000|0000001210121000000|000000010001000000", 
"40-64:440000004400044000|330000033330033000|330000330033033000|220000220022022000|220000220022022000|111110011110011111|111110001100011111"
]; 

FORWARD_STEP = 16;

function Wave() {
    /**
     * Wave is just a group of enemies arranged following a pattern. 
     *
     * Members : 
     * pool - Enemies pool, to avoid recreating new objects each wave.
     * speedX - speed at which enemies move horizontally
     * speedY - speed at which enemies move vertically
     */

    this.init = function() {
	this.speedX = 1;
	this.speedY = 1;
	this.forward = false;
	this.prev = 0;
	this.pool = new EnemyPool();
	this.pool.init(64, ["enemy", -20, -20, 1]);
	this.pool.moveAll = function(x, y) {
	    var bound = false;
	    var decX = 0;	    
	    for (i in this.units) {
		var currentU = this.units[i];
		if (!currentU.active)
		    continue;
		currentU.move(x, y);
		if (currentU.x < 0) {
		    // left		    
		    console.log("pos "+i+" : "+currentU.x+","+currentU.y);
		    console.log("pas chelou ? "+decX+"-"+(-currentU.x));
		    decX = Math.max(decX, -currentU.x);
		} else if (this.units[i].x + 32 > 800) {
		    // right
		    decX = Math.min(decX, -(currentU.x +32 - 800));
		}		    
	    }
	    console.log("decX : "+decX);
	    if (decX != 0) {
		for (i in this.units) {
		    this.units[i].move(decX, 0);
		}
		return true;
	    } 
	}
    } 

    this.update = function() {
//	var prev = 0;
	(function(){
	    this.pool.units[0].clear();
	    this.pool.update();
	    // TODO : consider deltaTime
	    //	if (this.pool.moveAll(this.speedX*deltaTime, 0) ) {
	    if (this.forward){
		this.pool.moveAll(0, this.speedY);	
		this.prev += this.speedY;
		if (this.prev >= FORWARD_STEP) {
		    this.forward = false;
		}
	    } else if (this.pool.moveAll(this.speedX, 0) ) {
 		this.forward = true;
		this.prev = 0;
		this.speedX = -this.speedX;	    
	    }
	}).apply(this);
    }

    this.spawn = function(pattern) {
	var dash = pattern.indexOf("-");
	var colon = pattern.indexOf(":");
	var originalX = parseInt(pattern.substring(0, dash));
	var x = 0;
	x += originalX;
	var y = parseInt(pattern.substring(dash+1, colon));
	var enemies = pattern.substring(colon+1);
	var lines = enemies.split('|');
	for (i in lines) {
	    var line = lines[i];
	    while (line.length > 0) {
		var lvl = parseInt(line.substring(0,1));
		if (lvl != 0)
		    this.pool.spawn([x, y, lvl]);
		console.log("spawned enemy at "+x+","+y);
		x += 40;
		line = line.slice(1);
	    }
	    x = 0 + originalX;
	    y += 40;
	}
    }
    

}
Wave.prototype = new GameObject();

function EnemyPool() {
}
EnemyPool.prototype = new Pool();
EnemyPool.prototype.createUnit = function(args) {
    var e = new Enemy();
    e.init.apply(e, args);
    return e;
};
EnemyPool.prototype.resetUnit = function(e) {
    e.reset(40, 40, 1);
};
