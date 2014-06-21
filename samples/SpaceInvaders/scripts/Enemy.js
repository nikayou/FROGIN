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
	this.level = -1;
	this.graphics = new Clip();
	this.changeLevel(lvl);
	this.health = this.level;
	console.log("enemy created at "+x+","+y+"("+lvl);
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
    }
    this.reset = function(x, y, lvl) {
	this.x = x;
	this.y = y;
	this.changeLevel(lvl);	
	console.log("enemy resetted at "+x+","+y+"("+lvl);
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

function Wave() {
    /**
     * Wave is just a group of enemies arranged following a pattern. 
     *
     * Members : 
     * pool - Enemies pool, to avoid recreating new objects each wave.
     * 
     */

    this.init = function() {
	this.pool = new EnemyPool();
	this.pool.init(64, ["enemy", -20, -20, 1]);
    } 

    this.update = function() {
	this.pool.units[0].clear();
	this.pool.update();
    }

    this.spawn = function(pattern) {
	console.log("spawning");
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
    console.log("creating unit");
    var e = new Enemy();
    e.init(args);
    return e;
};
EnemyPool.prototype.resetUnit = function(e) {
    e.reset(40, 40, 1);
};
