function CollisionManager() {

    this.objects = [];
    this.actions = [[],[]];
    this.condition = function(){ return true; };
    this.init = function(condition){
	// check before checking collision, if TRUE, then collision is checked
	this.condition = condition; 
    };

    this.update = function() {
	for (i=0; i < this.objects.length; i++) {
	    for (j=i+1; j < this.objects.length; j++) {
		var o1 = this.objects[i];
		var o2 = this.objects[j];
		if ( this.condition(o1,o2) ) {
		    if ( o1.collider.collidesWith(o2.collider) ) {
			this.actions[o1.name][o2.name](o1, o2);
		    }
		} else {
		}
	    }
	}
    };

    this.addObject = function(o) {
	this.objects[this.objects.length] = o;
    };

    this.registerAction = function(n1, n2, action) {
	var t2 = [];
	t2[n2] = action;
	this.actions[n1] = t2;
    }

}
