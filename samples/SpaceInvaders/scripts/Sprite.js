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
			  0, 0, 
			  this.width, this.height);
    }

}
