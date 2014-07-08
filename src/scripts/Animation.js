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
    var loop = false; // tells if animation should be repeated

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
	timer += deltaTime;
	while (timer >= step.duration) {    
	    timer -= step.duration;
	    index++;
	    if (index >= this.animation.steps.length) {
		// when animation is over, switch to another animation		
		index = 0;
		if (!loop) {
		    var def = this.defaultAnimationName;
		    this.animation = this.spritesheet.animations[def];
		    loop = true;
		}
	    }
	    step = this.animation.steps[index];
	    copyClip(this.spritesheet.clips[step.clip]);
	}
    }

    this.draw = function(context, x, y) {
	clip.draw(context, x, y);
    }

    this.playAnimation = function(name, looped) {
	this.animation = this.spritesheet.animations[name];
	loop = looped;
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
