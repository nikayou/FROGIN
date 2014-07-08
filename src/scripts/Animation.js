function Animation() {
    /**
     * Animation makes the link between an image and a spritesheet. 
     * It simply holds information about clips and their durations, with 
     * more data such as name. 
     *
     *
     * Members : 
     * spritesheet - spritesheet bound to the (clip) texture
     * animation - currently played animation
     * defaultAnimationName - played when no other is specified
     */

    var timer = 0.0; // tells when the step should change
    var index = 0; // index of the current step

    step = null; // current step of the animation
    var clip = new Clip();    

    this.defaultAnimationName = "";

    this.init = function(spritesheet, img) {
	this.spritesheet = spritesheet;
	clip.texture = img;
	this.defaultAnimationName = this.spritesheet.defaultAnimationName;
	this.playAnimation( this.defaultAnimationName );
    }

    this.setSpritesheet = function(s) {
	this.spritesheet = s;
    }
    this.setImage = function(i) {
	clip.texture = i;
    }
    this.setDefaultAnimationName = function(name) {
	this.defaultAnimationName = name;
    }

    this.update = function() {
	timer += 1.0/60.0;
	if (adjustTime.apply(this)) {
	    // step has changed
	    nextStep.apply(this);
	}
    }

    this.draw = function(context, x, y) {
	clip.draw(context, x, y);
    }

    var adjustTime = function() {
	var changed = false;
	console.log(step.duration);
	while (timer >= step.duration) {
	    changed = true;
	    index++;
	    console.log("index : "+index);
	    // this.animation undefined
	    step = this.animation.steps[index];
	    timer -= step.duration;
	}
	return changed;
    }

    var nextStep = function() {	
	if (index >= this.animation.steps.length) {
	    // when animation is over, switch to another animation
	    index = 0;
	    if (this.defaultAnimation != "")
		this.animation = this.spritesheet.animations[name];
	} 
	step = this.animation.steps[index];
	copyClip(this.spritesheet.clips[step.clip]);
    }

    this.playAnimation = function(name) {
	this.animation = this.spritesheet.animations[name];
	console.log("set animation "+this.animation);
	timer = 0.0;
	index = 0;
	step = this.animation.steps[index];
	copyClip(this.spritesheet.clips[step.clip]);
    }

    var copyClip = function(other) {
	clip.setPosition(other.x, other.y);
	clip.setDimension(other.width, other.height);
	clip.setDelta(other.dx, other.dy);
    }

}
Animation.prototype = new Drawable();
