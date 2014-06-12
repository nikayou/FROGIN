var game = new Game();

function init() {
    game.init();
    game.start();
}

/*
 * Encapsulation for general game infos
 */
function Game() {

    this.init = function() {
	this.scene = new Level();
	this.scene.init();
    };

    this.start = function() {
	this.update();
	this.draw();
    };

    this.update = function() {
	this.scene.update();
    };

    this.draw = function() {
	this.scene.draw();
    };

    this.exit = function() {
	this.scene.exit();
    };

}


/*
 * Singleton holding all the images. Prevents images from being loaded twice. 
 */
var imageHolder = new function () {
    var nbImages = 1;
    // background image
    this.background = new Image();
    this.background.src = "assets/images/background.png";
    this.background.onload = imageLoaded_aux;
    // spritesheet
    this.spritesheet = new Image();
    this.spritesheet.src = "assets/images/spritesheet.png";
    this.spritesheet.onload = imageLoaded_aux;
    // load count
    var nbLoaded = 0;
    var imageLoaded_aux = function() {
	imageLoaded();
    };
    function imageLoaded() {
	nbLoaded++;
	if (nbLoaded == nbImages) {
	    window.init();
	}
    }
};
