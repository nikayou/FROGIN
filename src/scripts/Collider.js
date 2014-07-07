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
     *
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
    this.shapeName = "box";
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
	    var xgap = this.x - other.x;
	    // checking if the horizontal is matching
	    if (xgap > 0 && xgap < other.width 
		|| xgap < this.width) {
		// horizontal matches, checking vertical
		var ygap = this.y - other.y;
		if (ygap > 0 && ygap < other.height
		       || ygap < this.height) {
//		    console.log("collision :\n"+this.toString()+"\n"+this.toString());
		    return true;
		}
	    } else {
		return false;
	    }	    
	    
	} else if (other.shapeName === "circle"){

	}
    };
    this.move = function(x, y) {
	this.x += x;
	this.y += y;	
    }
    this.toString = function() {
	var s = this.shapeName+"-";
	s += this.x + "," + this.y;
	s+= " - "+this.width+"x"+this.height;
	return s;
    }
}
BoxCollider.prototype = new Collider();
