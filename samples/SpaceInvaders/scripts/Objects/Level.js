include("scripts/Bullet.js");

function Scene() {
    /**
     * Scene is a state of a game. Only the current state is handled by the 
     * loop. The game logic should be here. 
     *
     * Members : 
     * -
     */
    this.init = function() {};
    this.initRenderer = function() {};
    this.update = function() { };
    this.draw = function() {};
    this.exit = function() {};
}

// ally's bullets speed
A_BULLET_SPEED = -400;
// enemies' bullets speed
E_BULLET_SPEED = 400;
// ally's speed
A_SPEED = 320;
// minimum delay between to shoots
A_SHOOT_DELAY = 500; 

function Level() {
    /**
     * Level is the main scene, where the player attacks enemies. 
     *
     * Prototype : Scene
     * 
     * Members : 
     * background - outer space image
     * player - player's ship
     * bullets - array containing the bullets
     * canvas_* - different canvases to display
     */

    var wait = false; // when the prompt is waiting for an input

    this.init = function() {
	this.loadAssets();
	this.initRenderer();
	this.background = new Background();
	this.background.init("bg", 0, 0, 0, 0);
	this.background.draw();
	this.player = new Player();
	this.player.init("player", 400, 560);
	this.bullets = new BulletPool();
	this.bullets.init(32, [-20, -20, 0]);
	this.enemies = new Wave();
	this.enemies.init();
	// TODO : random ?
	this.enemies.spawnWave(PATTERNS[0]);
	// init controller
	this.controller = new Controller();
	this.controller.init(this);
	// init collisionManager
	this.collisionManager = new CollisionManager();
	this.collisionManager.init(function(o1, o2){ 
	    return (o1.active && o2.active 
		    && o1.name != o2.name 
		    && !(o1.name === "enemy" && o2.name === "bullet"));
	});
	var explode = function(o1, o2) {
	    o1.kill();
	    o2.loseHealth();
	};
	this.collisionManager.registerAction("bullet", "enemy", explode);
	for (i in this.bullets.units) {
	    this.collisionManager.addObject( this.bullets.units[i]);
	}
	var units = this.enemies.pool.units;
	for (i in units) {	    
	    this.collisionManager.addObject( units[i]);
	}
	var endPrompt = document.getElementById("endWave");
	endPrompt.style.left = (400-(endPrompt.offsetWidth/2))+"px";
	endPrompt.style.top = (300-(endPrompt.offsetHeight/2))+"px";
	document.getElementById("endWave").style.display = "none";
	/*
	 * The two following functions are necessary because otherwise, 
	 * "controller.updateDown" is called with the Window as context.
	 * This is bad, because the window doesn't have any "scene"
	 */
	var callDown = function(e) {
	    var ctrl = this.controller;
	    return function(){return ctrl.updateDown.bind(ctrl);};
	};
	var callUp = function(e) {
	    var ctrl = this.controller;
	    return function(){return ctrl.updateUp.bind(ctrl);};
	};
	/*
	 * Now we are getting the redirected functions, called with
	 * "Controller" as context. We could also want to use the Scene.
	 */
	document.addEventListener("keydown", callDown.apply(this)(), false);
	document.addEventListener("keyup", callUp.apply(this)(), false);
	var shoot = (function(){ 
	    var last = new Date();
	    return function() {
		var now = new Date();
		if (now - last >= A_SHOOT_DELAY) {
		    last = now;
		    var x = this.player.x + 15;
		    var y = this.player.y - 9;
		    var b = this.bullets.spawn([x, y, A_BULLET_SPEED]);
		    this.collisionManager.addObject(b);
		}
	    } })();
	var event = new Event();
	event.init(shoot, TRIGGER_MAINTAIN);
	var left = new Event();
	left.init(function(){this.player.move(-A_SPEED);}, 
		  TRIGGER_MAINTAIN);
	var right = new Event();
	right.init(function(){this.player.move(A_SPEED);},
		   TRIGGER_MAINTAIN);
	var save = new Event();
	save.init(function(){this.saveProgresses();},
		  TRIGGER_PRESS);
	var cont = new Event();
	cont.init(function(){
	    this.continueGame(); 
	    wait=false;
	}, 
		  TRIGGER_PRESSED);
	var saveInput = new InputMap();
	var gameInput = new InputMap();
	saveInput.init();
	saveInput.register("s", save);
	saveInput.register("space", cont);
	gameInput.init();
	gameInput.register("space", event);
	gameInput.register("left", left);
	gameInput.register("right", right);
	this.controller.addInputMap(gameInput, 0);
	this.controller.addInputMap(saveInput, 1);
	this.controller.enable(0);
	this.controller.disable(1);
    };

    this.loadAssets = function() {
	textureManager.loadWithID("assets/images/background.png", "background");
	textureManager.loadWithID("assets/images/spritesheet.png", "spritesheet");
	var sprtPath = "assets/spritesheets/";
	spritesheetManager.loadWithID(sprtPath+"enemy1.xml", "enemy1");
	spritesheetManager.loadWithID(sprtPath+"enemy2.xml", "enemy2");
	spritesheetManager.loadWithID(sprtPath+"enemy3.xml", "enemy3");
	spritesheetManager.loadWithID(sprtPath+"enemy4.xml", "enemy4");
	spritesheetManager.loadWithID(sprtPath+"bonus.xml", "bonus");

    }

    this.initRenderer = function() {
	this.canvas_background = document.getElementById("canvas_background");
	this.canvas_enemies = document.getElementById("canvas_enemies");
	this.canvas_ally = document.getElementById("canvas_ally");
	this.canvas_bullets = document.getElementById("canvas_bullets");
	if ( this.canvas_background.getContext ) {
	    // initialize contexts
	    // background
	    this.context_background = this.canvas_background.getContext("2d");
	    Background.prototype.context = this.context_background;
	    Background.prototype.canvasWidth = this.canvas_background.width;
	    Background.prototype.canvasHeight = this.canvas_background.height;
	    this.context_enemies = this.canvas_enemies.getContext("2d");
	    // enemies
	    this.context_enemies = this.canvas_enemies.getContext("2d");
	    Enemy.prototype.context = this.context_enemies;
	    Enemy.prototype.canvasWidth = this.canvas_enemies.width;
	    Enemy.prototype.canvasHeight = this.canvas_enemies.height;	    
	    // ally
	    this.context_ally = this.canvas_ally.getContext("2d");
	    Player.prototype.context = this.context_ally;
	    Player.prototype.canvasWidth = this.canvas_ally.width;
	    Player.prototype.canvasHeight = this.canvas_ally.height;
	    // bullets
	    this.context_bullets = this.canvas_bullets.getContext("2d");
	    Bullet.prototype.context = this.context_bullets;
	    Bullet.prototype.canvasWidth = this.canvas_bullets.width;
	    Bullet.prototype.canvasHeight = this.canvas_bullets.height;
	}	
    };

    this.update = function() {
	Level.prototype.update();
	var commands = this.controller.getCommands();
	for (var i = 0; i < commands.length; i++) {
	    commands[i].call(this);
	}
	this.background.update();
	this.bullets.update();
	this.player.update();
	this.enemies.update();
	if (this.enemies.getState() == 'dead' && !wait) {
	    // end of a wave
	    waves++;
	    updateWaves();
	    document.getElementById("endWave").style.display = "block";
	    this.controller.disable(0);
	    this.controller.enable(1);
	    wait = true;
	}
	this.collisionManager.update();
	document.getElementById("fps").innerHTML = "dt: "+deltaTime;
	this.draw();
    };

    this.draw = function() {
	
    };

    this.exit = function() {
	this.player.exit();
	this.background.exit();
    };

    this.saveProgresses = function() {
	this.controller.disable(1);
	download("save.json", getSaveState.call(this));
	this.controller.enable(1);
    };

    this.continueGame = function() {
	document.getElementById("endWave").style.display = "none";
	this.enemies.newWave.call(this.enemies);
	this.controller.enable(0);
	this.controller.disable(1);
    };

}
Level.prototype = new Scene();

function download(filename, data) {
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([data], {type: 'text/json'}));
    a.download = filename;

    // Append anchor to body.
    document.body.appendChild(a)
    a.click();

    // Remove anchor from body
    document.body.removeChild(a)
}

function getSaveState() {
    var output = {
	"score":score, 
	"waves":waves, 
	"previousWaves": "351204", 
	"health":this.player.health
    };
    return JSON.stringify(output);

}
