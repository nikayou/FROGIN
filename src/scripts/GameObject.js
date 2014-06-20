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
	    this.context.clearRect(this.x, this.y, this.x+this.width, this.y+this.height);
	}else{	    
	    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	}
    };
    this.draw = function() {
	this.clear();
	this.graphics.draw(this.context, this.x, this.y);
    };
    this.drawRelative = function() {
	this.clear();
	this.graphics.draw(this.context, 0, 0);
    };
    this.exit = function() {};
}

