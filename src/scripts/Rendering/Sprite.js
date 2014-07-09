include(scriptsPath+"Rendering/Drawable.js");

function Sprite() {
    /**
     * Sprite is a facility class to help displaying images.
     * 
     * Prototype : Drawable
     * 
     * Members : 
     * texture - image to draw (often HTMLImageElement)
     */
    this.init = function(img) {
	this.texture = img;
    };

    this.draw = function(context, x, y) {
	context.drawImage(this.texture, x, y);
    };
}
Sprite.prototype = new Drawable();

