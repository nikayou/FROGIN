function GameObject() {
    /**
     * GameObject are objects held by the scene. They can be updated and 
     * should be drawn.
     *
     * Members : 
     * name - identifier to describe the object with ease
     * graphics - thing to draw
     */
    this.init = function(name) {
	this.name = name;
    };
    this.update = function() {
    };
    this.clear = function() {
	if (this.width && this.height) {
	    // better to work on discrete coordinates
	    var x = Math.floor(this.x);
	    var y = Math.floor(this.y);
	    var w = Math.ceil(this.width);
	    var h = Math.ceil(this.height);
	    // it could still be a gap because of conversion.
	    if (x != this.x)
		w++;
	    if (y != this.y)
		h++;
	    this.context.clearRect(x, y, w, h);
	}else{	    
	    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	}
    };
    this.draw = function() {
	this.graphics.draw(this.context, this.x, this.y);
    };
    this.drawRelative = function() {
	this.graphics.draw(this.context, 0, 0);
    };
    this.clearAndDraw = function() {
	this.clear();
	this.draw();
    };
    this.clearAndDrawRelative = function() {
	this.clear();
	this.drawRelative();
    };
    this.exit = function() {};
}

