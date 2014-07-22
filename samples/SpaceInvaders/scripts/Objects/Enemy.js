include("scripts/GUI.js");

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

    var dying = false; // tells if the unit is dying or not
    var deathTime = 0.0; // time elasped since death
    var DEATH_TIME_TOTAL = 0.25; // time the death lasts (see animation)

    this.init = function(name, x, y, lvl) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.collider = new BoxCollider();
	this.collider.init(x, y, 32, 32);
	this.level = -1;
	this.graphics  = new Animation();
	this.changeLevel(lvl);
	this.health = this.level;
	dying = false;
    }
    this.update = function() {
	if (dying) {
	    deathTime += deltaTime;
	    if (deathTime >= DEATH_TIME_TOTAL) {
		this.kill();
	    }
	}
	this.graphics.update();
	return true;
    }
    this.changeLevel = function(lvl) {
	if (this.level != lvl && lvl > 0) {
	    this.level = lvl;
	    var sprt = spritesheetManager.get("enemy"+lvl);
	    this.graphics.init(sprt, textureManager.get("spritesheet") );
	}
    }
    this.move = function(x, y) {
	if (!dying) {
	    this.x += x;
	    this.y += y;
	    this.collider.move(x, y);
	}
    }
    this.reset = function(x, y, lvl) {
	this.x = x;
	this.y = y;
	this.collider.x = x;
	this.collider.y = y;	
	this.changeLevel(lvl);
	this.health = lvl;
	dying = false;
	deathTime = 0;
	this.graphics.playAnimation("move", false);
    }
    this.kill = function() {
	updateScore(1);
	this.reset(0, 0, 0);
	this.active = false;
    }
    this.loseHealth = function() {
	this.health --;
	if (this.health <= 0) {
	    this.collider.x = -32;
	    this.collider.y = -32;
	    dying = true;
	    deathTime = 0;
	    this.graphics.playAnimation("death", false);
	}else {	    
	    this.graphics.playAnimation("hit", false);
	}
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
PATTERNS_RAW = [
"180:44444444444|33333333333|22222222222|11111111111|11111111111", 
"64:00000400000400000|00000000000000000|00400000400000400|03030003030003030|20202020202020202|00000000000000000|12121012121012121|11111011111011111", 
"180-0:00001410000|00010001000|00102220100|01020302010|10203430201|40234443204|10203430201|01020302010|00102220100|00010001000|00001410000", 
"20:3430343034303430343|0300030003000300030|0023202320232023200|0002000200020002000|0000121012101210000|0000010001000100000|0000001210121000000|000000010001000000", 
"40:440000004400044000|330000033330033000|330000330033033000|220000220022022000|220000220022022000|111110011110011111|111110001100011111"
]; 
PATTERNS = [];

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

    var state = 'birth'; // birth, living, dead, as a cycle
    var patternIndex = -1;
    var frontLine = 0; // target Y before enemies start moving
    var lastUnit = null; // last unit of the pool, for birth

    this.init = function() {
	this.speedX = 64;
	this.speedY = 64;
	this.forward = false;
	this.prev = 0;
	for (var i = 0; i < PATTERNS_RAW.length; i++) {
	    var p = decodePattern(PATTERNS_RAW[i]);
	    PATTERNS[i] = p;
	}
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
		    decX = Math.max(decX, -currentU.x);
		} else if (this.units[i].x + 32 > 800) {
		    // right
		    decX = Math.min(decX, -(currentU.x +32 - 800));
		}		    
	    }
	    if (decX != 0) {
		for (i in this.units) {
		    this.units[i].move(decX, 0);
		}
		return true;
	    } 
	}
    } 

    this.update = function() {
	(function(){
	    this.pool.units[0].clear();
	    this.pool.update();
	    // checking for a living unit	  
	    var n = 0;
	    for (i in this.pool.units) {
		if (this.pool.units[i].active) {
		    n++;
		    break;
		}
	    }
	    if (n == 0) {
		reset.apply(this);
		return;
	    }
	    
	    //
	    if (state == 'birth') {
		if (lastUnit.y >= 40) {
		    state = 'living';
		} else {
		    var speedYdelta = this.speedY * deltaTime;
		    this.pool.moveAll(0, speedYdelta);
		}
		return;
	    }
	    if (this.forward) {
		var speedYdelta = this.speedY * deltaTime;
		this.pool.moveAll(0, speedYdelta);	
		this.prev += speedYdelta;
		if (this.prev >= FORWARD_STEP) {
		    this.forward = false;
		}			
	    } else if (this.pool.moveAll(this.speedX * deltaTime, 0) ) {
 		this.forward = true;
		this.prev = 0;
		this.speedX = -this.speedX;	    
	    }
	}).apply(this);
    }

    var decodePattern = function(pattern) {
	var res = new Object();
	var colon = pattern.indexOf(":");
	var enemies = pattern.substring(colon+1);
	var lines = enemies.split('|');
	res.x = parseInt(pattern.substring(0, colon));
	res.enemies = [];
	for (i in lines) {
	    var line = lines[i];
	    var j = 0;
	    res.enemies[i] = [];
	    while (line.length > 0) {
		res.enemies[i][j] = parseInt(line.substring(0,1));
		line = line.slice(1);
		j++;
	    }
	}
	return res;
    }

    this.spawnWave = function(pattern) {
	var x = pattern.x;
	var y = -40 * (pattern.enemies.length+1);
	var lines = pattern.enemies;
	this.pool.despawnAll();
	for (i in lines) {
	    var line = pattern.enemies[i];
	    for (j in line) {
		if (line[j] > 0) {
//		    console.log("spawning "+line[j]+" at "+x+","+y);
		    var u = this.pool.spawn([x, y, line[j]]);
		}
		x += 40;
	    }	    
	    x = 0 + pattern.x;
	    y += 40;
	}
	frontLine = 40 * pattern.enemies.length;
	lastUnit = this.pool.getLastActive();
	console.log("new frontline : "+frontLine);
    }

    this.newWave = function() {
	patternIndex++;
	if (patternIndex >= PATTERNS.length) {
	    patternIndex = 0;
	    // TODO : increase difficulty
	}
	var pattern = PATTERNS[patternIndex];
	state = 'birth';
	this.spawnWave(pattern);	
    }
    
    var reset = function() {
	state = 'dead';
    }

    this.getState = function() {
	return state;
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
