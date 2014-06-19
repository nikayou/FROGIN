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
    }

    this.draw = function(context, x, y) {
	context.drawImage(this.texture, x, y);
    }
}
Sprite.prototype = new Drawable();

function Clip() {
    /**
     * Clip is a facility class to display clips of images.
     *
     * Prototype : Sprite
     * 
     * Members :
     * x, y - position of the top-left corner of the clip (in the image)
     * width, height - dimensions of the clip
     */
    this.init = function(img, x, y, w, h) {
	Clip.prototype.init(img);
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
    };

    this.draw = function(context, x, y) {
	context.drawImage(this.texture, 
			  this.x, this.y, 
			  this.width, this.height,
			  x, y, 
			  this.width, this.height);
    }

}
Clip.prototype = new Sprite();
