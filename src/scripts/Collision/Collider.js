function Collider() {
    /**
     * Collider is a shape representing the zone of an object that is 
     * collideable. 
     * The base class doesn't represent a really concrete thing, but 
     * subclasses should match reasonnable shapes, like rectangle or 
     * circle. 
     *
     * Members : 
     * shapeName - name of the shape, to match the irght test
     */

    this.shapeName = "unknown";

    this.init = function(name) {
	this.shapeName = name;
    };

    /**
     * Tests if current collider collides with another collider given 
     * as argument. 
     */
    this.collidesWith = function(other) { false; };

}

function BoxCollider(x, y, width, height) {
    /**
     * BoxCollider is a rectangle-shaped collider. 
     *
     * Prototype : Collider
     * 
     * Members :
     * x, y - position of the top-left corner
     * width, height - dimensions
     */
    BoxCollider.prototype.shapeName = "box";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.init = function(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
    };

    this.collidesWith = function(other) {
	if (other.shapeName === "box") {
	    var xGap = this.x - other.x;
	    var xCollides = false;
	    if (xGap > 0) {
		xCollides = (xGap <= other.width)
	    } else if (xGap < 0){
		xCollides = (-xGap <= this.width);
	    } else {
		// xGap == 0, there is at least 1 point in common
		xCollides = true;
	    }
	    if (xCollides) {
		var yGap = this.y - other.y;
		var yCollides = false;
		if (yGap > 0) {
		    yCollides = (yGap <= other.height)
		} else if (yGap < 0){
		    yCollides = (-yGap <= this.height);
		} else {
		    // yGap == 0, there is at least 1 point in common
		    yCollides = true;
		}
		return yCollides;
	    }
	} else if (other.shapeName === "circle"){
	    
	}
	return false;
    };

    this.move = function(x, y) {
	this.x += x;
	this.y += y;	
    };

    this.toString = function() {
	var s = this.shapeName+"-";
	s += this.x + "," + this.y;
	s+= " - "+this.width+"x"+this.height;
	return s;
    };
}
BoxCollider.prototype = new Collider();
