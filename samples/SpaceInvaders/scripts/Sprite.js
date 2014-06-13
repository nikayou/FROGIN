/**
 * Sprite is a facility class to help clipping images. 
 * texture : reference to an image (often HTMLImageElement)
 * x, y : starting point of the clip in the image
 * width, height : dimensions of the clip
 */
function Sprite() {

    this.init = function(img, x, y, w, h) {
	this.texture = img;
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
