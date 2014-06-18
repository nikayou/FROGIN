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

function Level() {
    /**
     * Level is the main scene, where the player attacks enemies. 
     *
     * Prototype : Scene
     * 
     * Members : 
     * background - outer space image
     * player - player's ship
     * canvas_* - different canvases to display
     */
    this.init = function() {
	this.initRenderer();
	this.background = new Background();
	this.background.init("bg", 0, 0, 0, 0);
	this.background.draw();
	this.player = new Player();
	this.player.init("player", 400, 560);
//	this.player.init("player", 40, 0);
	this.enemy = new Enemy();
	this.enemy.init("enemy", 80, 60);
	// init controller
	this.controller = new Controller();
	this.controller.init(this);
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
	var spaceAction = function(lvl){console.log("PIOU");};
	var event = new Event();
	event.init("space", spaceAction);
	var left = new Event();
	left.init("left",   
		  function(){this.player.move(-10);}, 
		  TRIGGER_MAINTAIN);
	var right = new Event();
	right.init("right", 
		   function(){this.player.move( 10);},
		   TRIGGER_MAINTAIN);
	this.controller.registerEvent(event);
	this.controller.registerEvent(left);
	this.controller.registerEvent(right);
    };
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
	}	
    };
    this.update = function() {
	Level.prototype.update();
	//console.log("getting commands");
	var commands = this.controller.getCommands();
	for (c in commands ) {
	    console.log("command "+c);
	    c.call(c, this);
	}
	this.background.update();
	this.player.update();
	this.controller.cleanCommands();
    };
    this.draw = function() {
//	this.background.draw();
//	this.player.context.fillRect(0,0,64,64);
//	this.player.draw();
	this.enemy.draw();
    };
    this.exit = function() {
	this.player.exit();
	this.background.exit();
    };
}
Level.prototype = new Scene();
