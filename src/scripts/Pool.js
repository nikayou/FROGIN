function Pool() {
    /**
     * Pool manages the construction, spawning, and destruction of objects
     * assuming the fact that there is a limit of these objects.
     *
     * Members : 
     * MAX_UNITS - maximum number of objects that can be present at the same 
     *             time
     * units - array containing all objects with a state : active/inactive
     *
     * How it works : 
     * creation of objects is a long task, so we prefer to do it at the 
     * beginning of the game, and enable these objects on demand. 
     * When we need an object, it is taken at the end : active objects are 
     * located at the front of the array, inactive objects are located 
     * at the end of the array. 
     * It is required to define a "createUnit(args)" function, that returns 
     * simply a new unit with given args
     */
    var MAX_UNITS = 0;
    this.units = [];

    /**
     * Creates 'max' objects initialised with the given args, and sets them
     * as 'inactive'. 
     * function 'createUnit' needs to be defined
     */
    this.init = function(max, args) {
	MAX_UNITS = max;
	for (var i = 0; i < MAX_UNITS; i++) {
	    // needs to be defined
	    var u = this.createUnit(args);
	    u.active = false;
	    this.units[i] = u;
	}
    }

    /**
     * Should be redefined in implementing classes. 
     * Example of function of creation. 
     */
    this.createUnit = function(args) {
	console.log("createUnit : ObjectPool");
	var r = new Object();
	r.init(args);
	return r;
    }

    /**
     * Activates an object with the given args and returns it.
     * If no object can be activated, the pool is full and 'null' is returned. 
     */
    this.spawn = function(args) {
	var unit = this.units[MAX_UNITS-1];
	if(!unit.active) {
	    unit.active = true;
	    unit.reset.apply(unit, args);
	    this.units.unshift(this.units.pop());
	    return unit;
	}
	return null;
    }
    
    /**
     * Reorganises the array to keep separation between active and inactive. 
     * Moves the object at the given index at the end.
     */
    this.despawn = function(i) {
	this.units.push((this.units.splice(i,1))[0]);
    }

    /**
     * 
     */
    this.update = function() {
	for (var i = 0; i < MAX_UNITS; i++) {
	    if (this.units[i].update()) {
		this.units[i].draw();
	    }else {
		this.despawn(i);
		this.active = false;
	    }
	}
    }
}
