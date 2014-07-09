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

function Clip() {
    /**
     * Clip is a facility class to display clips of images.
     *
     * Prototype : Sprite
     * 
     * Members :
     * x, y - position of the top-left corner of the clip (in the image)
     * width, height - dimensions of the clip
     * dx, dy - coordinates of the hotpoint (gap between top-left and center)
     */

    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.dx = 0;
    this.dy = 0;

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
			  x - this.dx, y - this.dy, 
			  this.width, this.height);
    };

    this.setPosition = function(x, y) {
	this.x = x;
	this.y = y;
    };

    this.setDimension = function(w, h) {
	this.width = w;
	this.height = h;
    };

    this.setDelta = function(x, y) {
	this.dx = x;
	this.dy = y;
    };

    this.toString = function() {
	var s = "Clip ";
	s += this.x + "," + this.y + "-";
	s += this.width + "*" + this.height + "-";
	s += this.dx + "," + this.dy;
	return s;
    };

}
Clip.prototype = new Sprite();
