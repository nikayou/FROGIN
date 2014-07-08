var start = function() {
    game.init(new Level());
}

/**
 * Singleton holding all the images. Prevents images from being loaded twice. 
 */
/**
var imageHolder = new function () {
    var nbImages = 2;
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
*/
var textureManager = new TextureManager();
